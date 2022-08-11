import {Exercice, Seance} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @class Seances : Permet de gérer les données des séances
 */
export default class SeancesStore {
    private seances: Seance[] = [] as Seance[];

    constructor() {
        SeancesStore._getSeances().then((seances: Seance[]) => this.seances = seances);
    }

    private static async _getSeances(): Promise<Seance[]> {
        let seancesJson: Seance[] = [] as Seance[];

        const seancesString = await AsyncStorage.getItem('Seances');

        if (seancesString) {
            seancesJson = JSON.parse(seancesString);
        }

        return seancesJson;
    }

    public async getSeances(): Promise<Seance[]> {
        await SeancesStore._getSeances();
        return this?.seances || [] as Seance[];
    }

    public getSeanceByID(idSeance: string) {
        const seanceIndex = this.seances.findIndex(s => s.id === idSeance);

        if (seanceIndex === -1) return;

        return this.seances[seanceIndex];
    }

    private async _setSeances() {
        await AsyncStorage.setItem(
            'Seances',
            JSON.stringify(this.seances)
        )
    }

    public addSeance(seance: Seance) {
        const isExisting = this.seances.findIndex(s => s.id === seance?.id);

        if (isExisting > -1) {
            this.seances[isExisting] = seance;
            this._setSeances();
            return;
        }

        this.seances.push(seance);
        this._setSeances();
    }

    public addOrUpdateExerciceByID(exercice: Exercice, idSeance: string) {
        const seanceIndex = this.seances.findIndex(s => s.id === idSeance);

        if (seanceIndex === -1) return;

        let seance = this.seances[seanceIndex] as Seance;

        if (!seance.exercices) {
            seance.exercices = [] as Exercice[];
        }

        const index = seance.exercices.findIndex((e: Exercice) => e.id === exercice.id);

        if (index) {
            seance.exercices[index] = exercice;
            return;
        }

        seance.exercices.push(exercice);
    }
}
