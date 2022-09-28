export interface Exercice {
  id?: string;
  nom: string;
  description?: string;
  nbSeries: number;
  nbRepetitions: number;
  intensite?: number;
  charge: number;
  tempsRepos: number;
  tempos?: string;
  sensation?: string;
}

export interface Seance {
  id?: string;
  nom?: string;
  exercices?: Exercice[];
  cycle?: Cycle;
}

export interface Cycle {
  id?: string;
  nom?: string;
}
