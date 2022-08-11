import React, {useState} from "react";
import {Text, View, Button, TextInput} from "react-native";

// Imports stores et types
import {Exercice, Seance} from "../types";
import SeancesStore from "../stores/seancesStore";

const FormUpdateSeance = (props: any) => {
    const [seance, setSeance] = useState({...props.seance} as Seance);


    const submit = () => {
        const seancesStores = new SeancesStore;
        seancesStores.addOrUpdateSeance(seance);
        props.onSubmit();
    }


    if (props.isUpdatingSeance) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Modifier une séance</Text>
                <Text>{seance.nom}</Text>
                <TextInput placeholder="Nom de la séance" onChangeText={value => setSeance({...seance, nom: value})}/>
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
export default FormUpdateSeance;