export interface Hero {
  id: string;
  trainerName: string;
  name: string;
  isAttacker: boolean;
  isDefender: boolean;
  firstTrainingDate: Date;
  lastTrainingDate: Date;
  numTrainingAtLastDate: number;
  numTrainingToday: number;
  suitPart1Color: string;
  suitPart2Color: string;
  suitPart3Color: string;
  startingPower: number;
  currentPower: number;
}
