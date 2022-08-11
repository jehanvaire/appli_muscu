import React, { useState } from 'react';
import { Text, View } from 'react-native';
import uuid from 'react-native-uuid';

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";

const Test = () => {
    /**
     * States
     */
    const [exercice, setExercice] = useState({} as Exercice);
    const [seances, setSeances] = useState([] as Seance[]);
    const [loading, setLoading] = useState(true);

    /**
     * Stores const
     */
    const seancesStores = new SeancesStore;

    /**
     * Test de création de données
     */
    const creteFakeData = async() => {
        /**
         * Création d'un exercice
         */
        const exercice = {
            id: uuid.v4() as string,
            nom: 'Exercice de test'
        } as Exercice

        /**
         * Ajout au state pour l'affichage
         */
        setExercice(exercice);

        /**
         * Création de deux séances
         */
        const _seance = {
            id: uuid.v4() as string,
            nom: 'Seance de test 1',
            exercices: [
                exercice
            ]
        } as Seance;

        const _seance2 = {
            id: uuid.v4() as string,
            nom: 'Seance de test 2',
            exercices: [
                exercice
            ]
        } as Seance;

        /**
         * Ajout au store
         */
        seancesStores.addSeance(_seance);
        seancesStores.addSeance(_seance2);

        /**
         * Ajout au state pour affichage
         */
        setSeances(await seancesStores.getSeances());
        setLoading(false);
    }

    /**
     * Création de la vue
     */
    if(loading) {
        creteFakeData();
        return (
            <View>
                <Text>Chargement en cours ...</Text>
            </View>
        )
    } else {
        return (
            <View>
                <View>
                    <Text>Votre exercice :</Text>
                    <View>
                        <Text>{exercice?.id}</Text>
                        <Text>{exercice?.nom}</Text>

                    </View>
                </View>

                <View style={{height: 1, backgroundColor: 'black'}} />

                <View>
                    <Text>Vos séances :</Text>
                    {seances !== undefined && seances.map((s: Seance) => {
                        return (
                            <View key={s?.id}>
                                <Text>{s?.nom}</Text>

                                {s?.exercices !== undefined && s?.exercices?.map((e : Exercice) => {
                                    return (
                                        <View key={e?.id}>
                                            <Text>Exercice de votre séance</Text>
                                            <Text>{e?.nom}</Text>
                                        </View>
                                    )
                                })}

                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

}

export default Test;
