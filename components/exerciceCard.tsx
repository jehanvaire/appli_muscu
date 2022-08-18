import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ExerciceCard = (props : any) => {
    return (
        <View style={styles.exerciceCard}>
            <Text>{props.exercice.nom}</Text>
            <Text>Nombre de séries : {props.exercice.nbSeries}</Text>
            <Text>Nombre de répétitions : {props.exercice.nbRepetitions}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    exerciceCard : {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(77, 77, 77, .7)'
    }
})

export default ExerciceCard;
