import React from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Button, TextInput} from "react-native";

import {useState} from "react";

// types
import {Exercice} from "../types";
import SeancesStore from "../stores/seancesStore";

const FormUpdateExercice = (props: any) => {
    const [exercice, setExercice] = useState({...props.exercice} as Exercice);
    const seancesStores = new SeancesStore;

    const submit = async() => {
        await seancesStores.addOrUpdateExerciceByID(exercice, props.seance.id);
        props.onSubmit();
    }

    return (
        <View>

            <TextInput style={styles.cardViewTextInput} value={exercice.nom} onChangeText={value => setExercice({...exercice, nom: value})}/>





            <Button title="Valider" onPress={async() => {
                await submit();
            }}/>

            <Button title="Retour" color="primary" onPress={() => {
                props.onClose();
            }}/>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft : 'auto',
        marginRight : 'auto',
        fontSize: 20
    },
    exerciceChip : {
        paddingVertical : 5,
        width : '90%',
        marginLeft : 'auto',
        marginRight : 'auto',
        backgroundColor : '#666',
        color : '#fff',
        borderRadius : 8,
        marginTop: 5,
        marginBottom : 5,
        fontWeight : 'bold',
        justifyContent : 'space-between'
    },
    cardViewTextInput: {
        borderWidth: 1,
        borderColor: "#f194ff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: "#4d4d4d",
        color: "#f194ff"
    },
});

export default FormUpdateExercice;