import {Seance, Exercice} from '../types';

/**
 * @class SeanceStore : Permet de gérer une séance
 */
class SeanceStore {
    private seance : Seance = {} as Seance;

    public getSeance() : Seance {
        return this.seance;
    }

    public setSeance(seance : Seance) {
        this.seance = seance;
    }

    public addOrUpdateExercice(exercice : Exercice) {
        if(!this.seance.exercices) {
            this.seance.exercices = [] as Exercice[];
        }

        const index = this.seance.exercices.findIndex((e : Exercice) => e.id === exercice.id);

        if(index) {
            this.seance.exercices[index] = exercice;
            return;
        }

        this.seance.exercices.push(exercice);
    }
}