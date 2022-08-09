import {Seance} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @class Seances : Permet de gérer les données des séances
 */
class SeancesStore {
    private seances : Seance[] = [] as Seance[];

    constructor() {
        SeancesStore._getSeances().then((seances : Seance[]) => this.seances = seances);
    }

    private static async _getSeances() : Promise<Seance[]> {
        let seancesJson : Seance[] = [] as Seance[];

        const seancesString = await AsyncStorage.getItem('Seances');

        if(seancesString) {
            seancesJson = JSON.parse(seancesString);
        }

        return seancesJson;
    }

    public getSeances() : Seance[] {
        return this.seances;
    }

    private async _setSeances() {
        try {
            await AsyncStorage.setItem(
                'Seances',
                JSON.stringify(this.seances)
            )
        } catch (e) {
            console.error(e)
        }
    }

    public addSeance(seance : Seance) {
        this.seances.push(seance);
        this._setSeances().then(e => console.error(e));
    }
}
