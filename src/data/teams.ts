export const TEAMS = [
  "AmaZulu",
  "Cape Town City",
  "Chippa United",
  "Golden Arrows",
  "Kaizer Chiefs",
  "Magesi",
  "Mamelodi Sundowns",
  "Marumo Gallants",
  "Orlando Pirates",
  "Polokwane City",
  "Richards Bay",
  "Royal AM",
  "Sekhukhune United",
  "Stellenbosch",
  "SuperSport United",
  "TS Galaxy",
];

export const TEAM_IDS = TEAMS.map((name) => ({ id: name.toLowerCase().replace(/\s+/g, "-"), name }));
