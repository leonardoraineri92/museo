import { Painting } from './painting';

export interface Gallery {
  id: number;
  name: string;
  paintings:Painting[];
}
