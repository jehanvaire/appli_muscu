import React from "react";
import {View, Text, ScrollView, StyleSheet} from "react-native";
import CustomButton from "../components/button";

// types
import {Exercice} from "../types";

const ConsultSeance = (props : any) => {
    return (
        <View style={{flex: 4}}>
            <ScrollView>
                {props.seance?.exercices && props.seance?.exercices?.map((exercice: Exercice) => {
                    return (
                        <View key={exercice?.id} style={styles.exerciceChip}>
                            <Text style={styles.exerciceText}>{exercice?.nom}</Text>
                        </View>
                    )
                })}
            <CustomButton
                title='Retour'
                onPress={() => {
                    props.onClose()
                }}/>
            </ScrollView>
        </View>
    )
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
