import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const ExerciceCard = (props : any) => {

    const [exercice, setExercice] = useState(props.exercice);
    const [runExercice, setRunExercice] = useState(false);
    const [currentSerie, setCurrentSerie] = useState(0);
    const [info, setInfo] = useState("");

    const onNextSerie = () => {
        if(currentSerie === exercice.nbSeries) {
            setInfo("Exercice terminé");
            return;
        }

        setCurrentSerie(currentSerie + 1);
    }

    return (
        <View style={styles.exerciceCard}>
            {info ? <Text style={styles.info}>{info}</Text> : null}
            <Text>{exercice.nom}</Text>
            <Text>Nombre de séries : {exercice.nbSeries}</Text>

            <View>
                <Text>{currentSerie} sur {exercice.nbSeries} série{exercice.nbSeries > 1 ? 's' : null}</Text>
            </View>

            <Pressable style={styles.button} onPress={onNextSerie}>
                <Text style={styles.text}>Prochaine série</Text>
            </Pressable>
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
    },
    button: {
        width: '66%',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#b0e600',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    info : {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        backgroundColor: '#ffd445',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 10
    }
})

export default ExerciceCard;
