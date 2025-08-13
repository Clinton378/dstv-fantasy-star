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
  budget: 100, // ZAR millions
};

// Scoring system based on Betway Fantasy PSL 2025/26 rules
export const SCORING_SYSTEM = {
  // Basic participation
  playing: 1, // up to 60 minutes
  playing60Plus: 2, // 60+ minutes
  
  // Goal scoring
  goals: 6, // all positions
  assists: 3, // all positions
  
  // Clean sheets (60+ minutes)
  cleanSheetGKDEF: 4, // GK and DEF
  cleanSheetMIDFWD: 1, // MID and FWD
  
  // Goalkeeping
  penaltySaved: 5, // GK only
  
  // Penalties and discipline
  penaltyMissed: -2,
  yellowCard: -1,
  redCard: -3,
  ownGoal: -2,
  
  // Goals conceded (GK and DEF)
  goalsConcededPer2: -1, // every 2 goals conceded
  
  // Defensive contributions (DEFCON)
  defconPoint: 1, // 1 point per 10 CBIT, max 3 per game
  defconMaxPerGame: 3,
  
  // Bonus points
  bonusPoints: [3, 2, 1], // 1st, 2nd, 3rd best player in match
  
  // Transfer costs
  transferCost: -4, // per additional transfer beyond free allocation
  
  // Free transfers
  freeTransfersPerGameweek: 1,
  maxSavedTransfers: 5, // resets after reaching 5
};
