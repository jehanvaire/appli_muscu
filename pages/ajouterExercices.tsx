import React, {useState} from "react";
import {Text, View, StyleSheet, Button, TextInput} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";
import uuid from "react-native-uuid";

const FormAddExercice = (props: any) => {

    const [exercice, setExercice] = useState({id: uuid.v4() as string} as Exercice);
    const seancesStores = new SeancesStore;

    const submit = async () => {
        await seancesStores.addOrUpdateExerciceByID(exercice, props.seance.id);
        setExercice({id: uuid.v4() as string} as Exercice);
        props.onSubmit();
    }

    const setExerciceNom = (nom: string) => {
        setExercice({...exercice, nom: nom});
    }

    if (props.isAddingExercice) {
        return (
            <View style={styles.cardView}>
                <Text style={styles.cardViewTitle}>Créer un exercice</Text>
                <Text>{exercice.nom}</Text>
                <TextInput style={styles.cardViewTextInput} placeholder="Nom de l'exercice"
                           onChangeText={value => setExerciceNom(value)}/>
                <Button title="Valider" color="green" onPress={async() => {
                    await submit();
                }
                }/>
                <Button title="Annuler" color="#c20e0e" onPress={() => {
                    props.onClose();
                }
                }/>
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    cardView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#4d4d4d',
        justifyContent: 'space-between',
        borderRadius: 8,
        width: '90%',
        height: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 15
    },
    cardViewTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4d4d4d",
    },
    cardViewTextInput: {
        borderWidth: 1,
        borderColor: "#f194ff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: "#4d4d4d",
        color: "#f194ff",
    },
});

export default FormAddExercice;