export interface Exercice {
    id? : string,
    nom? : string,
    nbSeries? : number,
    nbRepetitions? : number,
    intensite? : number,
    charge? : number,
    tempsRepos? : number,
    tempos? : string,
    sensation? : string
}

export interface Seance {
    id? : string,
    nom? : string,
    exercices? : Exercice[],
}