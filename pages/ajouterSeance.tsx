import React, {useState} from "react";
import {Text, View, Button, TextInput} from "react-native";
import uuid from 'react-native-uuid';


import {Seance} from "../types";
import SeancesStore from "../stores/seancesStore";

const FormAddSeance = (props: any) => {
    const [seance, setSeance] = useState({id: uuid.v4() as string} as Seance);
    const seancesStores = new SeancesStore;


    const submit = () => {
        seancesStores.addOrUpdateSeance(seance);
        setSeance({id: uuid.v4() as string} as Seance);
        props.onSubmit();
    }


    const setSeanceNom = (nom: string) => {
        setSeance({...seance, nom: nom});
    }

    if (props.isAddSeance) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Créer une séance</Text>
                <Text>{seance.nom}</Text>
                <TextInput placeholder="Nom de la séance" onChangeText={value => setSeanceNom(value)}/>

                <Button title="Valider" color="#f194ff" onPress={() => {
                    submit();
                }}/>

                <Button title="Annuler" color="#f194ff" onPress={() => {
                    props.onClose();
                }}/>

            </View>
        )
    } else {
        return null;
    }

}

export default FormAddSeance;