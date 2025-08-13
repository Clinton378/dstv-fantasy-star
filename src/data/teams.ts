export const TEAMS = [
  "AmaZulu FC",
  "Cape Town City FC", 
  "Chippa United",
  "Golden Arrows",
  "Kaizer Chiefs",
  "Magesi FC",
  "Mamelodi Sundowns",
  "Marumo Gallants",
  "Orlando Pirates",
  "Polokwane City",
  "Richards Bay FC",
  "Royal AM",
  "Sekhukhune United",
  "Stellenbosch FC",
  "SuperSport United",
  "TS Galaxy",
];

export const TEAM_IDS = TEAMS.map((name) => ({ id: name.toLowerCase().replace(/\s+/g, "-"), name }));
