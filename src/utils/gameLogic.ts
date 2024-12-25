export const generateSequence = (length: number, max: number): number[] => {
  return Array(length).fill(0).map(() => Math.floor(Math.random() * max));
};

export const checkSequence = (playerSeq: number[], correctSeq: number[]): boolean => {
  return playerSeq.every((note, i) => note === correctSeq[i]);
};