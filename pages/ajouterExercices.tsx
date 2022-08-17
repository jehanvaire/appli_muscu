import React, {useState} from "react";
import {Text, View, StyleSheet, Button, TextInput, ScrollView} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";
import uuid from "react-native-uuid";

const FormAddExercice = (props: any) => {

    const [exercice, setExercice] = useState({id: uuid.v4() as string} as Exercice);
    const seancesStores = new SeancesStore;

    const [errorNom, setErrorNom] = useState(true);
    const [errorNbSeries, setErrorNbSeries] = useState(true);
    const [errorNbRepetition, setErrorNbRepetition] = useState(true);
    const [errorCharge, setErrorCharge] = useState(true);
    const [errorTemps, setErrorTemps] = useState(true);
    const [globalErrorMessage, setGlobalErrorMessage] = useState('');


    const submit = async () => {
        setGlobalErrorMessage('');

        if (!errorNbSeries || !errorNbRepetition || !errorCharge || !errorTemps || !errorNom) {
            await seancesStores.addOrUpdateExerciceByID(exercice, props.seance.id);
            setExercice({id: uuid.v4() as string} as Exercice);
            props.onSubmit();
            return;
        }

        setGlobalErrorMessage('Des champs sont erreurs');
        return;
    }

    const setExerciceNom = (nom: string) => {
        setExercice({...exercice, nom: nom});

        if (nom.length > 0) {
            setErrorNom(false);
        }
        else {
            setErrorNom(true);
        }
    }

    const setExerciceDescription = (description: string) => {
        setExercice({...exercice, description: description});
    }

    const setExerciceNbSeries = (nbSeries: number) => {
        setExercice({...exercice, nbSeries: Number(nbSeries)});

        nbSeries = Math.round(nbSeries);

        if (isNaN(Number(nbSeries)) || nbSeries === 0) {
            setErrorNbSeries(true);
        } else {
            setErrorNbSeries(false);
        }
    }

    const setExerciceNbRepetitions = (nbRepetitions: number) => {
        setExercice({...exercice, nbRepetitions: nbRepetitions});

        nbRepetitions = Math.round(nbRepetitions);

        if (isNaN(Number(nbRepetitions)) || nbRepetitions === 0) {
            setErrorNbRepetition(true);
        } else {
            setErrorNbRepetition(false);
        }
    }

    const setExerciceIntensite = (intensite: number) => {
        setExercice({...exercice, intensite: intensite});
    }

    const setExerciceCharge = (charge: number) => {
        setExercice({...exercice, charge: charge});

        if (isNaN(Number(charge)) || charge === 0) {
            setErrorCharge(true);
        } else {
            setErrorCharge(false);
        }
    }

    const setExerciceTempsRepos = (tempsRepos: number) => {
        setExercice({...exercice, tempsRepos: tempsRepos});

        tempsRepos = Math.round(tempsRepos);

        if (isNaN(Number(tempsRepos)) || tempsRepos === 0) {
            setErrorTemps(true);
        } else {
            setErrorTemps(false);
        }
    }

    const setExerciceTempos = (tempos: string) => {
        setExercice({...exercice, tempos: tempos});
    }

    const setExerciceSensation = (sensation: string) => {
        setExercice({...exercice, sensation: sensation});
    }

    if (props.isAddingExercice) {
        return (
            <ScrollView style={styles.cardView}>
                <Text style={styles.cardViewTitle}>Créer un exercice</Text>
                {globalErrorMessage ? <Text style={styles.cardViewError}>{globalErrorMessage}</Text> : null}

                {errorNom ? <Text style={styles.cardViewError}>Nom d'exercice requis</Text> : null}
                <TextInput style={styles.cardViewTextInput} placeholder="Nom de l'exercice"
                           onChangeText={value => setExerciceNom(value)}/>

                <TextInput style={styles.cardViewTextInput} placeholder="Description de l'exercice"
                           onChangeText={value => setExerciceDescription(value)}/>

                {errorNbSeries ? <Text style={styles.cardViewError}>Nombre de séries incorrect</Text> : null}
                <TextInput style={styles.cardViewTextInput} placeholder="Nombre de séries"
                           onChangeText={value => setExerciceNbSeries(parseInt(value))}
                           keyboardType='numeric'/>

                {errorNbRepetition ? <Text style={styles.cardViewError}>Nombre de répétitions incorrect</Text> : null}
                <TextInput style={styles.cardViewTextInput} placeholder="Nombre de répétitions"
                           onChangeText={value => setExerciceNbRepetitions(parseInt(value))}
                           keyboardType='numeric'/>

                <TextInput style={styles.cardViewTextInput} placeholder="Intensité"
                           onChangeText={value => setExerciceIntensite(parseInt(value))}
                           keyboardType='numeric'/>

                {errorCharge ? <Text style={styles.cardViewError}>Charge incorrecte</Text> : null}
                <TextInput style={styles.cardViewTextInput} placeholder="Charge (kg)"
                           onChangeText={value => setExerciceCharge(parseInt(value))}
                           keyboardType='numeric'/>

                {errorTemps ? <Text style={styles.cardViewError}>Temps de repos incorrect</Text> : null}
                <TextInput style={styles.cardViewTextInput} placeholder="Temps de repos (s)"
                           onChangeText={value => setExerciceTempsRepos(parseInt(value))}
                           keyboardType='numeric'/>

                <TextInput style={styles.cardViewTextInput} placeholder="Tempos"
                           onChangeText={value => setExerciceTempos(value)}/>

                <TextInput style={styles.cardViewTextInput} placeholder="Sensation"
                           onChangeText={value => setExerciceSensation(value)}/>


                <View style={[styles.btnWrapper, {
                        flexDirection: "row"
                    }]}>
                    <View style={styles.btn}>
                        <Button title="Créer" color="green" onPress={async () => {
                            await submit();
                        }}/>
                    </View>
                    <View style={styles.btn}>
                        <Button title="Annuler" color="#c20e0e" onPress={() => {
                            props.onClose();
                        }}/>
                    </View>
                </View>
            </ScrollView>
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
        borderRadius: 8,
        width: '90%',
        height: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 15
    },
    cardViewTitle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
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
    cardViewError: {
        color: "red",
        fontSize: 12,
        marginLeft: 10,
        marginBottom: 10,
    },
    btnWrapper : {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    btn : {
        paddingHorizontal: 5,
        paddingVertical: 5,
    }
});

export default FormAddExercice;