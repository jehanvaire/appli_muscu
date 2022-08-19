import React from "react";
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Button} from "react-native";

import {useState} from "react";

// types
import {Exercice} from "../types";
import SeancesStore from "../stores/seancesStore";

const FormUpdateExercice = (props: any) => {
    const [exercice, setExercice] = useState({...props.exercice} as Exercice);
    const seancesStores = new SeancesStore;

    const submit = () => {
        console.log(exercice);
    }

    return (
        <View>
            <Button title="Valider" onPress={() => {
                submit();
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
});

export default FormUpdateExercice;