export type Position = "GK" | "DEF" | "MID" | "FWD";

export interface Team {
  id: string;
  name: string;
}

export interface Player {
  id: string;
  name: string;
  team: string; // team id
  position: Position;
  price: number; // in millions, e.g., 5.5
  photo?: string;
}

export interface SquadSlot {
  playerId: string;
  start: boolean; // starting XI
}

export interface Formation {
  def: number;
  mid: number;
  fwd: number;
}

export const FORMATIONS: Formation[] = [
  { def: 3, mid: 4, fwd: 3 },
  { def: 3, mid: 5, fwd: 2 },
  { def: 4, mid: 4, fwd: 2 },
  { def: 4, mid: 3, fwd: 3 },
  { def: 4, mid: 5, fwd: 1 },
  { def: 5, mid: 4, fwd: 1 },
  { def: 5, mid: 3, fwd: 2 },
  { def: 5, mid: 2, fwd: 3 },
];

export const SQUAD_LIMITS = {
  total: 15,
  GK: 2,
  DEF: 5,
  MID: 5,
  FWD: 3,
  teamMax: 3,
  budget: 100,
};
