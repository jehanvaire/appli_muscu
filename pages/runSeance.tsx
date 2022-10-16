import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../components/button';

// Import des composants et types
import { Exercice } from '../types';
import ExerciceCard from '../components/exerciceCard';

const RunSeance = (props: any) => {
  const [exercices, setCurrentExercices] = useState(props.seance?.exercices);
  const [info, setInfo] = useState('');
  const [currentExerciceKey, setCurrentExerciceKey] = useState(0);

  const next = () => {
    if (currentExerciceKey >= Object.keys(exercices).length - 1) {
      setInfo('Exercices terminés');
      return;
    }

    setCurrentExerciceKey(currentExerciceKey + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {info ? <Text style={styles.info}>{info}</Text> : null}

        <View style={styles.exerciceCard} key={exercices[currentExerciceKey].id}>
          <ExerciceCard exercice={exercices[currentExerciceKey]} />
        </View>

        <View style={styles.button}>
          <CustomButton
            title="Prochain exercice"
            onPress={() => {
              next();
            }}
          />
        </View>
      </View>

      <View style={styles.button}>
        <CustomButton
          title="Retour"
          onPress={() => {
            props.onClose();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 8,
    backgroundColor: '#ffd445',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  exerciceCard: {
    height: '40%',
    // center the card
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    width: '66%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default RunSeance;
