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
    const [seances, setSeances] = useState([] as Seance[]);
    const [loading, setLoading] = useState(true);
    const [isAddSeance, setIsAddSeance] = useState(false);

    /**
     * Stores const
     */
    const seancesStores = new SeancesStore;

    const loadData = async() => {
        const res = await seancesStores.getSeances();

        if(res) {
            setSeances(res);
            setLoading(false);
        }
    }

    async function handleSubmit(){
        setLoading(true)
        await loadData()
        setIsAddSeance(false);
    }

    if(loading) {
        loadData();

        return(
            <View>
                <Text>
                    Chargement en cours
                </Text>
            </View>
        )
    } else {
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

                <FormAddSeance isAddSeance={isAddSeance} onClose={async() => handleSubmit()}/>

                {seances !== undefined && seances.map((seance : Seance) => {
                    return (
                        <Text key={seance?.id}>{seance?.nom}</Text>
                    )
                })}
            </View>
        )

    }
}

export default Menu;