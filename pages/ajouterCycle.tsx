import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

import CyclesStore from '../stores/cyclesStore';
import { Cycle } from '../types';

const FormAddCycle = (props: any) => {
  const [cycle, setCycle] = useState({ id: uuid.v4() as string } as Cycle);
  const cyclesStore = new CyclesStore();

  const setCycleNom = (nom: string) => {
    setCycle({ ...cycle, nom: nom });
  };

  const submit = () => {
    cyclesStore.addOrUpdateCycle(cycle);
    setCycle({ id: uuid.v4() as string } as Cycle);
    props.onSubmit();
  };

  if (props.isAddCycle) {
    return (
      <View style={styles.cardView}>
        <Text style={styles.cardViewTitle}>Créer un cycle</Text>
        <Text>{cycle.nom}</Text>
        <TextInput
          style={styles.cardViewTextInput}
          placeholder="Nom du cycle"
          onChangeText={(value) => setCycleNom(value)}
        />

        <Button
          title="Valider"
          color="green"
          onPress={() => {
            submit();
          }}
        />

        <Button
          title="Annuler"
          color="#c20e0e"
          onPress={() => {
            props.onClose();
          }}
        />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  cardView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#4d4d4d',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: '90%',
    height: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 15,
  },
  cardViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  cardViewTextInput: {
    borderWidth: 1,
    borderColor: '#f194ff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#4d4d4d',
    color: '#f194ff',
  },
});

export default FormAddCycle;
