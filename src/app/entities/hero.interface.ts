export interface Hero {
  id: string;
  trainerId: number;
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
