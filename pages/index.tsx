import React, {useState} from "react";
import {Text, View, StyleSheet, Button, ScrollView, TouchableOpacity} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";

// Import components, pages et style
import Nav from "../components/nav";
import CustomButton from "../components/button";
import FormAddSeance from "./ajouterSeance";
import FormUpdateSeance from "./modifSeance";
import FormAddExercice from "./ajouterExercices"
import ConsultSeance from "./consultSeance";

const Menu = () => {
    /**
     * States
     */
    const [seances, setSeances] = useState([] as Seance[]);
    const [loading, setLoading] = useState(true);
    const [isAddSeance, setIsAddSeance] = useState(false);
    const [isUpdatingSeance, setIsUpdatingSeance] = useState(false);
    const [seanceToUpdate, setSeanceToUpdate] = useState({} as Seance);
    const [seanceToAddExercice, setSeanceToAddExercice] = useState({} as Seance);
    const [isAddingExercice, setIsAddingExercice] = useState(false);
    const [isConsultSeance, setIsConsultSeance] = useState(false);
    const [seanceToConsult, setSeanceToConsult] = useState({} as Seance);
    const [toOpenPanel, setToOpenPanel] = useState(-1);


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
        setToOpenPanel(-1);
        setLoading(true)
        setIsAddSeance(false);
        setIsUpdatingSeance(false);
        setIsAddingExercice(false);
        await loadData()
    }

    const updateSeance = (seance: Seance) => {
        setSeanceToUpdate(seance);
        setIsUpdatingSeance(true);
    }

    const deleteSeance = async (idSeance?: string) => {
        if (idSeance === undefined) return;

        setToOpenPanel(-1);
        seancesStores.deleteSeance(idSeance);
        await loadData();
    }

    const addExercice = (seance: Seance) => {
        setSeanceToAddExercice(seance);
        setIsAddingExercice(true);
    }


    const getTitle = () => {
        if (isUpdatingSeance) {
            return 'Modifier une séance'
        }
        if (isAddSeance) {
            return 'Créer une séance'
        }
        if (isConsultSeance) {
            return 'Vous consultez ' + seanceToConsult?.nom
        }

        return 'Vos séances'
    }

    const setOpenPanel = (index  : number) => {

    }

    /**
     *
     * PARTIE VUE
     *
     */
    if (loading) {
        loadData();

        return (<View>
            <Text>
                Chargement en cours
            </Text>
        </View>)
    } else if (isUpdatingSeance) {
        // afficher le formulaire de modification de séance
        return (<View style={[styles.container, {
            flexDirection: "column"
        }]}>

            <Nav title={getTitle()}/>

            <View style={{flex: 3}}>
                <FormUpdateSeance seance={seanceToUpdate} isUpdatingSeance={isUpdatingSeance}
                                  onSubmit={async () => handleSubmit()}
                                  onClose={() => {
                                      setIsUpdatingSeance(false);
                                      setSeanceToUpdate({} as Seance);
                                      setToOpenPanel(-1);
                                  }}/>
            </View>
        </View>)

    }

    else if (isAddingExercice) {
        // afficher le formulaire d'ajout d'exercices
        return (
            <View style={[styles.container, {
                flexDirection: "column"
            }]}>

                <Nav title={getTitle()}/>

                <View style={{flex: 3}}>
                    <FormAddExercice seance={seanceToAddExercice} isAddingExercice={isAddingExercice}
                                     onSubmit={async () => handleSubmit()}
                                     onClose={() => {
                                        setIsAddingExercice(false);
                                        setSeanceToAddExercice({} as Seance);
                                        setToOpenPanel(-1);
                                     }}
                    />
                </View>
            </View>
        )
    }

    else if(isConsultSeance) {
        return (
            <View style={[styles.container, {
                flexDirection: "column"
            }]}>
                <Nav title={getTitle()}/>
                <ConsultSeance seance={seanceToConsult} onClose={() => {
                    setIsConsultSeance(false);
                    setSeanceToConsult({} as Seance);
                }}/>
            </View>
        )
    }

    else {
        // else afficher séances
        return (<View style={[styles.container, {
            flexDirection: "column"
        }]}>

            <Nav title={getTitle()}/>

            <View style={{flex: 3}}>
                {isAddSeance ? null : <View>
                    <CustomButton
                        title='Ajouter une séance'
                        onPress={() => {
                            setIsAddSeance(!isAddSeance);
                            setToOpenPanel(-1);
                        }}/>
                </View>}

                {isUpdatingSeance ? <Text>Modifier une séance</Text> : null}


                <FormAddSeance isAddSeance={isAddSeance} onSubmit={async () => handleSubmit()}
                               onClose={() => {
                                    setIsAddSeance(false);
                                    setToOpenPanel(-1);
                            }}/>

                <ScrollView>
                    {seances !== undefined && seances.map((seance: Seance, index : number) => {
                        return (<TouchableOpacity onPress={() => {
                            setSeanceToConsult(seance);
                            setIsConsultSeance(true)
                        }} key={seance?.id} style={styles.cardView}>
                            <View style={[styles.container, {
                                flexDirection: "row"
                            }]}>
                                <Text style={styles.cardViewTitle}>{seance?.nom}</Text>
                                <Button
                                    color="primary"
                                    title='...'
                                    onPress={async () => {
                                        toOpenPanel === index ? setToOpenPanel(-1) : setToOpenPanel(index)
                                    }}/>
                            </View>

                            <Text
                                style={styles.cardViewRecap}>{seance?.exercices?.length ? 'La séance contient ' + seance?.exercices?.length + ' exercices' : "Cette séance n'a pas encore d'exercice"}
                            </Text>

                            {toOpenPanel === index ?
                                <View style={styles.btnWrapper}>
                                    <View style={styles.spacer}>
                                        <Button
                                            title='Modifier'
                                            onPress={() => {
                                                updateSeance(seance);
                                            }}/>
                                    </View>

                                    <View style={styles.spacer}>
                                        <Button
                                            title='Ajouter exercices'
                                            color='#32a852'
                                            onPress={() => {
                                                addExercice(seance);
                                            }}/>
                                    </View>

                                    <View style={styles.spacer}>
                                        <Button
                                            color='#c20e0e'
                                            title='Supprimer'
                                            onPress={async () => {
                                                await deleteSeance(seance.id);
                                            }}/>
                                    </View>
                                </View>
                            : null }

                        </TouchableOpacity>)
                    }).reverse()}
                </ScrollView>
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
    }, cardViewTitle: {
        marginLeft: 'auto', marginRight: 'auto', color: "#fff", fontWeight: 'bold', fontSize: 34
    }, cardViewRecap: {
        marginLeft: 'auto', marginRight: 'auto', color: "#fff", marginBottom: 10
    },
    exerciceChip: {
        paddingVertical: 5,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#666',
        color: '#fff',
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    exerciceText: {
        fontWeight: 'bold',
        paddingHorizontal: 5,
        color : '#fff'
    },
    spacer : {
        marginTop: 10,
        marginTopBottom: 10
    },
    btnWrapper : {
        flex: 4,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#666',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8
    }
});

export default Menu;