
export enum Mode {
  HOME = 'HOME',
  FUSION = 'FUSION',
  DECOMPOSITION = 'DECOMPOSITION'
}

export interface FactorNode {
  id: string;
  value: number;
  isPrime: boolean;
  left?: FactorNode;
  right?: FactorNode;
}
