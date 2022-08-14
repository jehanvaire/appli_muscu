import React, {useState} from "react";
import {Text, View, Button, TextInput, StyleSheet, ScrollView} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";

const FormUpdateSeance = (props: any) => {
    const [seance, setSeance] = useState({...props.seance} as Seance);
    const [toOpenPanel, setToOpenPanel] = useState(-1);
    const seancesStores = new SeancesStore;

    const submit = () => {
        seancesStores.addOrUpdateSeance(seance);
        props.onSubmit();
    }

    const exerciceDelete = async(exercice : Exercice) => {
        const newSeance = await seancesStores.deleteExerciceByID(exercice, seance?.id || "");

        if(newSeance !== undefined) {
            setSeance(newSeance);
        }

        await props.reloadData();
    }

    if (props.isUpdatingSeance) {
        return (
            <ScrollView>
                <View style={styles.updateSeance}>
                    <Text style={styles.title}>{seance.nom}</Text>
                    <TextInput style={styles.cardViewTextInput} placeholder="Nom de la séance" onChangeText={value => setSeance({...seance, nom: value})}/>
                </View>

                {seance?.exercices?.length || 0 > 0 ?
                    <View style={styles.updateSeance}>
                        <Text style={styles.title}>Les exerices de la séances</Text>

                        {seance?.exercices?.map((exercice : Exercice, index: number) => {
                            return(
                                <View key={exercice?.id} style={styles.exerciceChip}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={styles.exerciceText}>{exercice?.nom}</Text>
                                        <Button
                                            color="primary"
                                            title='...'
                                            onPress={() => {
                                                toOpenPanel === index ? setToOpenPanel(-1) : setToOpenPanel(index)
                                            }}/>
                                    </View>

                                    {toOpenPanel === index ?
                                    <View style={styles.btnWrapper}>
                                        <Button
                                            color="#c20e0e"
                                            title='Supprimer'
                                            onPress={async () => {
                                                await exerciceDelete(exercice)
                                            }}/>
                                    </View>
                                    : null}
                                </View>
                            )
                        })}
                    </View>
                : null}

                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center"
                }}>
                    <Button title="Valider" onPress={() => {
                        submit();
                    }}/>

                    <Button title="Retour" color="primary" onPress={() => {
                        props.onClose();
                    }}/>
                </View>
            </ScrollView>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft : 'auto',
        marginRight : 'auto',
        fontSize: 20
    },
    updateSeance: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#4d4d4d',
        borderRadius: 8,
        color: '#fff',
        marginTop: 5,
        marginBottom: 5
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
    exerciceText : {
        fontWeight : 'bold',
        paddingHorizontal: 5,
        color : '#fff'
    },
    btnWrapper : {
        flex: 4,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#666',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    }
})

export default FormUpdateSeance;