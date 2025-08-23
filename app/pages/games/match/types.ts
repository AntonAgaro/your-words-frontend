import type { Word } from '~/shared/Words/types';

export enum GameWordStatus {
  Matched = 'Matched',
  InGame = 'inGame',
  inError = 'inError',
  InSelect = 'InSelect',
}
export type GameWord = Word & {
  status: GameWordStatus;
};
