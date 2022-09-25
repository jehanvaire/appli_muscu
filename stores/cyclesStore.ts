import { Cycle } from '../types';
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
}
