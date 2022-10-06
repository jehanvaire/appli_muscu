import { Cycle, Seance } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CyclesStore {
  private cycles: Cycle[] = [] as Cycle[];

  constructor() {
    CyclesStore._getCycles().then((cycles: Cycle[]) => (this.cycles = cycles));
  }

  private static async _getCycles(): Promise<Cycle[]> {
    let cyclesJson: Cycle[] = [] as Cycle[];

    const cyclesString = await AsyncStorage.getItem('Cycles');

    if (cyclesString) {
      cyclesJson = JSON.parse(cyclesString);
    }

    return cyclesJson;
  }

  public async getCycles(): Promise<Cycle[]> {
    await CyclesStore._getCycles();
    return this?.cycles || ([] as Cycle[]);
  }

  private async _setCycles() {
    await AsyncStorage.setItem('Cycles', JSON.stringify(this.cycles));
  }

  public async addOrUpdateCycle(cycle: Cycle) {
    const isExisting = this.cycles.findIndex((c: Cycle) => {
      return c.id === cycle.id;
    });

    if (isExisting > -1) {
      this.cycles[isExisting] = cycle;
      this._setCycles();
      return;
    }

    this.cycles.push(cycle);
    this._setCycles();
  }

  /**
   * Permet de récupérer la liste des séances organisées en fonction des cycles
   * @param seances
   * @returns Map ayant pour clef le cycle et une liste de séances en valeurs
   * Pour exploiter dans la partie il faut pas la liste des séances obtenue via
   * le SeancesStore puis créer une nouvelle partie vue dédié pour traiter l'affichage
   * en fonction des cycles
   */
  public getSortedSeances(seances: Seance[]): Map<Cycle, Seance[]> {
    let sortedMap: Map<Cycle, Seance[]> = new Map<Cycle, Seance[]>();

    this.cycles.forEach((cycle: Cycle) => {
      sortedMap.set(cycle, [] as Seance[]);
    });

    seances.forEach((seance: Seance) => {
      if (seance.cycle) {
        let arr = sortedMap.get(seance.cycle) || ([] as Seance[]);
        arr.push(seance);
        sortedMap.set(seance.cycle, arr);
      }
    });

    console.log(sortedMap);
    return sortedMap;
  }
}
