import React, {useState} from "react";
import {Text, View, StyleSheet, Button} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";

// Import components, pages et style
import Nav from "../components/nav";
import CustomButton from "../components/button";
import FormAddSeance from "./ajouterSeance";
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

    const getTitle = () => {
        if(isUpdatingSeance) {
            return 'Modifier une séance'
        }
        if(isAddSeance) {
            return 'Créer une séance'
        }

        return 'Vos séances'
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
            <View style={[styles.container, {
                flexDirection: "column"
                }]}>

                <Nav title={getTitle()}/>

                <View style={{flex : 3}}>
                    <FormUpdateSeance seance={seanceToUpdate} isUpdatingSeance={isUpdatingSeance}
                                    onSubmit={async () => handleSubmit()}
                                    onClose={() => {
                                        setIsUpdatingSeance(false);
                                        setSeanceToUpdate({} as Seance)
                                    }}/>
                </View>
            </View>
        )
    } else {
        return (
        <View style={[styles.container, {
            flexDirection: "column"
            }]}>

            <Nav title={getTitle()}/>

            <View style={{flex: 3}}>
                {isAddSeance ? <Text>Créer une séance</Text>
                    :
                    <View>
                        <CustomButton
                            title='Ajouter une séance'
                            onPress={() => {
                                setIsAddSeance(!isAddSeance);
                            }}/>
                    </View>}

                {isUpdatingSeance ? <Text>Modifier une séance</Text> : null}


                <FormAddSeance isAddSeance={isAddSeance} onSubmit={async () => handleSubmit()}
                            onClose={() => setIsAddSeance(false)}/>

                {seances !== undefined && seances.map((seance: Seance) => {
                    return (
                        <View key={seance?.id} style={styles.cardView}>
                            <Text style={styles.cardViewTitle}>{seance?.nom}</Text>
                            <Text style={styles.cardViewRecap}>{seance?.exercices?.length ?
                                'La séance contient ' + seance?.exercices?.length + 'exercices'
                                :
                                "Cette séance n'a pas encore d'exercice"}
                            </Text>

                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}>
                                <Button
                                    title='Modifier'
                                    onPress={() => {
                                        updateSeance(seance);
                                    }}/>

                                <Button
                                    color='#c20e0e'
                                    title='Supprimer'
                                    onPress={async() => {
                                        await deleteSeance(seance.id);
                                    }}/>
                            </View>

                        </View>
                    )
                })}
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    cardView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#4d4d4d',
        borderRadius: 8,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
        marginBottom: 15
    },
    cardViewTitle: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 34
    },
    cardViewRecap: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: "#fff",
        marginBottom: 10
    }
  });

export default Menu;