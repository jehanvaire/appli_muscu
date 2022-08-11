import React, {useState} from "react";
import {Text, View, Button, TextInput} from "react-native";
import uuid from 'react-native-uuid';

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";
import FormAddSeance from "./ajouterSeance";

const Menu = () => {
    /**
     * States
     */
    const [exercice, setExercice] = useState({} as Exercice);
    const [seances, setSeances] = useState([] as Seance[]);
    const [loading, setLoading] = useState(true);
    const [isAddSeance, setIsAddSeance] = useState(false);

    /**
     * Stores const
     */
    const seancesStores = new SeancesStore;

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Menu</Text>
            <Button
                title={!isAddSeance ? 'Ajouter une séance' : 'Annuler'}
                color="#f194ff"
                onPress={() => {
                    setIsAddSeance(!isAddSeance);
                }
                }/>

            <FormAddSeance isAddSeance={isAddSeance}/>
        </View>
    )
}

export default Menu;