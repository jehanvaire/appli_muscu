import React, {useState} from "react";
import {Text, View, Button, TextInput} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";
import FormAddSeance from "./ajouterSeance";
import FormModifSeance from "./modifSeance";
import FormUpdateSeance from "./modifSeance";

const Menu = () => {
    /**
     * States
     */
    const [seances, setSeances] = useState([] as Seance[]);
    const [loading, setLoading] = useState(true);
    const [isAddSeance, setIsAddSeance] = useState(false);
    const [isUpdatingSeance, setIsUpdatingSeance] = useState(false);
    const [seanceToUpdate, setSeanceToUpdate] = useState({} as Seance);

    /**
     * Stores const
     */
    const seancesStores = new SeancesStore;

    const loadData = async () => {
        const res = await seancesStores.getSeances();

        if (res) {
            setSeances(res);
            setLoading(false);
        }
    }

    async function handleSubmit() {
        setLoading(true)
        setIsAddSeance(false);
        setIsUpdatingSeance(false);
        await loadData()
    }

    const updateSeance = (seance: Seance) => {
        setSeanceToUpdate(seance);
        setIsUpdatingSeance(true);
    }

    const deleteSeance = async (idSeance?: string) => {
        if (idSeance === undefined) return;

        seancesStores.deleteSeance(idSeance);
        await loadData();
    }

    if (loading) {
        loadData();

        return (<View>
            <Text>
                Chargement en cours
            </Text>
        </View>)
    } else if (isUpdatingSeance) {
        return (
            <FormUpdateSeance seance={seanceToUpdate} isUpdatingSeance={isUpdatingSeance}
                              onSubmit={async () => handleSubmit()}
                              onClose={() => {
                                  setIsUpdatingSeance(false);
                                  setSeanceToUpdate({} as Seance)
                              }}/>
        )
    } else {
        return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            {isAddSeance ? <Text>Créer une séance</Text>
                :
                <View>
                    <Button
                        title='Ajouter une séance'
                        color="#f194ff"
                        onPress={() => {
                            setIsAddSeance(!isAddSeance);
                        }}/>
                </View>}

            {isUpdatingSeance ? <Text>Modifier une séance</Text> : null}


            <FormAddSeance isAddSeance={isAddSeance} onSubmit={async () => handleSubmit()}
                           onClose={() => setIsAddSeance(false)}/>

            {seances !== undefined && seances.map((seance: Seance) => {
                return (
                    <View key={seance?.id}>
                        <Text>{seance?.nom}</Text>
                        <Button
                            title='Modifier'
                            color="#f194ff"
                            onPress={() => {
                                updateSeance(seance);
                            }}/>

                        <Button
                            title='Supprimer'
                            color="red"
                            onPress={async() => {
                                await deleteSeance(seance.id);
                            }}/>

                    </View>
                )
            })}
        </View>)

    }
}

export default Menu;