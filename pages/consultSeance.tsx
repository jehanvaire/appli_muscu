import React, { useState } from "react";
import {View, Text, ScrollView, StyleSheet, Button, TouchableOpacity} from "react-native";
import CustomButton from "../components/button";
// components et types
import {Exercice} from "../types";
import RunSeance from "./runSeance";
import FormUpdateExercice from "./modifExercice";

const ConsultSeance = (props : any) => {

    const [isRunSeance, setIsRunSeance] = useState(false);
    const [isViewingExercice, setIsViewingExercice] = useState(false);
    const [exerciceToConsult, setExerciceToConsult] = useState({} as Exercice);

    const startSeance = () => {
        setIsRunSeance(true);
    }

    if(isRunSeance) {
        return (
            <View style={{flex: 4}}>
                <RunSeance seance={props.seance}/>
            </View>
        )

    } else if (isViewingExercice){
        return (
            <View>
                <FormUpdateExercice exercice={exerciceToConsult} seance={props.seance} onSubmit={props.onSubmit} onClose={props.onClose}/>
            </View>
        )
    } else {
        return (
            <View style={{flex: 4}}>
                <ScrollView>
                    {props.seance?.exercices && props.seance?.exercices?.map((exercice: Exercice) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                        setIsViewingExercice(true);
                                        setExerciceToConsult(exercice);
                                    }}
                                key={exercice?.id
                            }>
                                <View key={exercice?.id} style={styles.exerciceChip}>
                                    <Text style={styles.exerciceText}>{exercice?.nom}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                <View style={{marginBottom: 5, marginTop: 5}}>
                    <CustomButton
                        title='Lancer la séance'
                        onPress={() => {
                            startSeance()
                        }}/>
                </View>

                <CustomButton
                    title='Retour'
                    onPress={() => {
                        props.onClose()
                    }}/>
                </ScrollView>
            </View>
        )
    }
}

const styles  = StyleSheet.create({
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
        fontWeight : 'bold'
    },
    exerciceText : {
        fontWeight : 'bold',
        paddingHorizontal: 5,
        color : '#fff'
    }
})

export default ConsultSeance;
