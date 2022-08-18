import React, {useState} from "react";
import {Text, View, StyleSheet, Button, ScrollView, TouchableOpacity} from "react-native";

// Import des composants et types
import {Exercice} from '../types';
import ExerciceCard from "../components/exerciceCard";

const RunSeance = (props : any) => {

    const [seance, setSeance] = useState(props.seance);

    return (
        <View>
            {/* 
                Changer la map pour créer un stepper intéractif
            */}
            {seance?.exercices !== null && seance?.exercices?.map((e : Exercice) => {
                return (
                    <View key={e.id}>
                        <ExerciceCard exercice={e} />
                        {/* TODO :  Déroulé séance */}
                    </View>
                )
            })}
            {/* Btn next exercice */}
        </View>
    )
}

export default RunSeance;
