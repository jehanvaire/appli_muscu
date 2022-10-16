import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

import { useState } from 'react';

// types
import { Exercice } from '../types';
import SeancesStore from '../stores/seancesStore';

const FormUpdateExercice = (props: any) => {
  const [exercice, setExercice] = useState({ ...props.exercice } as Exercice);
  const seancesStores = new SeancesStore();

  const submit = async () => {
    await seancesStores.addOrUpdateExerciceByID(exercice, props.seance.id);
    props.onSubmit();
  };

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.grosTitre}>Modifier exercice</Text>

        <View style={styles.button}>
          <Button
            title="Retour"
            color="#c20e0e"
            onPress={() => {
              props.onClose();
            }}
          />
        </View>
      </View>
      <Text style={styles.title}>Nom</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.nom}
        onChangeText={(value) => setExercice({ ...exercice, nom: value })}
      />

      <Text style={styles.title}>Description</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.description}
        onChangeText={(value) => setExercice({ ...exercice, description: value })}
      />

      <Text style={styles.title}>Nombre de séries</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.nbSeries.toString()}
        keyboardType={'numeric'}
        onChangeText={(value) => setExercice({ ...exercice, nbSeries: Number(value) })}
      />

      <Text style={styles.title}>Nombre de répétitions</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.nbRepetitions.toString()}
        keyboardType={'numeric'}
        onChangeText={(value) => setExercice({ ...exercice, nbRepetitions: Number(value) })}
      />

      <Text style={styles.title}>Intensité (%)</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.intensite?.toString()}
        keyboardType={'numeric'}
        onChangeText={(value) => setExercice({ ...exercice, intensite: Number(value) })}
      />

      <Text style={styles.title}>Charge (kg)</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.charge}
        keyboardType={'numeric'}
        onChangeText={(value) => setExercice({ ...exercice, charge: value })}
      />

      <Text style={styles.title}>Temps de repos (s)</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.tempsRepos?.toString()}
        keyboardType={'numeric'}
        onChangeText={(value) => setExercice({ ...exercice, tempsRepos: Number(value) })}
      />

      <Text style={styles.title}>Tempos</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.tempos}
        onChangeText={(value) => setExercice({ ...exercice, tempos: value })}
      />

      <Text style={styles.title}>Sensation</Text>
      <TextInput
        style={styles.cardViewTextInput}
        value={exercice.sensation}
        onChangeText={(value) => setExercice({ ...exercice, sensation: value })}
      />

      <View style={styles.spacer}>
        <Button
          title="Valider"
          color="#32a852"
          onPress={async () => {
            await submit();
          }}
        />
      </View>

      <View style={styles.spacer}>
        <Button
          title="Supprimer"
          color="#c20e0e"
          onPress={() => {
            seancesStores.deleteExerciceByID(exercice, props.seance.id);
            props.onSubmit();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    fontSize: 20,
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
    fontWeight: 'bold',
    justifyContent: 'space-between',
  },
  cardViewTextInput: {
    borderWidth: 1,
    borderColor: '#32a852',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#555555',
    color: '#fff',
  },
  spacer: {
    marginTop: 10,
    marginTopBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    flex: 1,
    marginTop: 50,
    marginBottom: 10,
    marginRight: 10,
  },
  grosTitre: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 40,
    fontSize: 30,
  },
});

export default FormUpdateExercice;
