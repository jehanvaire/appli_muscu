import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Button } from 'react-native';
import TimeStore from '../stores/timeStore';

const ExerciceCard = (props: any) => {
  const [exercice, setExercice] = useState(props.exercice);
  const [currentSerie, setCurrentSerie] = useState(1);
  const [info, setInfo] = useState('');
  const [isBreak, setIsBreak] = useState(false);
  const [currentBreakTime, setIsCurrentBreakTime] = useState(exercice.tempsRepos);
  const [currentTime, setCurrentTime] = useState(currentBreakTime);

  const timeStore = new TimeStore();

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

  const getFormattedTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  React.useEffect(() => {
    if (isBreak) {
      // init timer
      timeStore.deleteTime();
      timeStore.storeTime(Math.floor(Date.now() / 1000));

      const timerId = setInterval(async () => {
        setCurrentTime(currentTime - 1); // décrémente le temps de 1

        const asTime = await timeStore.getCurrentTime(); // récupère le temps stocké

        const time = Math.floor(Date.now() / 1000); // récupère le temps actuel
        const diff = time - asTime; // calcule la différence
        timeStore.storeTime(time); // stocke le temps actuel

        if (diff > 1) {
          // si la différence est supérieur à 1 seconde
          setCurrentTime(currentTime - diff); // décrémente le temps de la différence
        }

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
        <Text style={styles.nom}>Temps de repos</Text>
        <Text style={styles.secondes}>{getFormattedTime(currentTime)}</Text>
        <View style={styles.btnWrapper}>
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
          <View style={styles.btn}>
            <Button
              title="END BREAK"
              color="#0062ff"
              onPress={() => {
                modifyTime(-currentTime);
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
        <Text style={styles.nom}>
          {exercice.nom} : {exercice.nbSeries} série{exercice.nbSeries > 1 ? 's' : null}
        </Text>
        <View>
          <Text style={styles.series}>
            {currentSerie} / {exercice.nbSeries}
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
  nom: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 'auto',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  secondes: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    margin: 'auto',
    color: '#FFFFFF',
  },

  series: {
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 10,
    fontWeight: 'bold',
    margin: 'auto',
    color: '#FFFFFF',
  },

  button: {
    width: '66%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#32a852',
  },
  exerciceCard: {
    color: '#fff',
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgba(77, 77, 77, .7)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btn: {
    marginTop: 10,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
});

export default ExerciceCard;
