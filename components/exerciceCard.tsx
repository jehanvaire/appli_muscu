import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Button } from 'react-native';

const ExerciceCard = (props: any) => {
  const [exercice, setExercice] = useState(props.exercice);
  const [currentSerie, setCurrentSerie] = useState(0);
  const [info, setInfo] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  const [currentBreakTime, setIsCurrentBreakTime] = useState(exercice.tempsRepos);
  const [currentTime, setCurrentTime] = useState(currentBreakTime);

  const onNextSerie = () => {
    if (currentSerie === exercice.nbSeries) {
      setInfo('Exercice terminé');
      return;
    }

    if (!isBreak) {
      setIsBreak(true);
      setCurrentSerie(currentSerie + 1);
      return;
    }
  };

  const modifyTime = (time: number) => {
    if (currentTime + time < 0) {
      setCurrentTime(0);
      return;
    }
    setCurrentTime(currentTime + time);
  };

  React.useEffect(() => {
    if (isBreak) {
      const timerId = setInterval(() => {
        setCurrentTime(currentTime - 1);
        if (currentTime === 0) {
          setCurrentTime(currentBreakTime);
          setIsBreak(false);
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  });

  if (isBreak) {
    return (
      <View style={styles.exerciceCard}>
        <Text>Temps de repos</Text>
        <Text>{currentTime} secondes</Text>
        <View
          style={[
            styles.btnWrapper,
            {
              flexDirection: 'row',
            },
          ]}
        >
          <View style={styles.btn}>
            <Button
              title="ADD 10s"
              color="green"
              onPress={async () => {
                modifyTime(10);
              }}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="SUB 10s"
              color="#c20e0e"
              onPress={() => {
                modifyTime(-10);
              }}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.exerciceCard}>
        {info ? <Text style={styles.info}>{info}</Text> : null}
        <Text>{exercice.nom}</Text>
        <Text>Nombre de séries : {exercice.nbSeries}</Text>

        <View>
          <Text>
            {currentSerie} sur {exercice.nbSeries} série{exercice.nbSeries > 1 ? 's' : null}
          </Text>
        </View>
        <Pressable style={styles.button} onPress={onNextSerie}>
          <Text style={styles.text}>Prochaine série</Text>
        </Pressable>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  exerciceCard: {
    color: '#fff',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(77, 77, 77, .7)',
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
    elevation: 3,
    backgroundColor: '#b0e600',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
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
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btn: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

export default ExerciceCard;
