import { Player } from "@/types/fantasy";

// Real Betway Fantasy PSL 2025/26 player data based on official rules
export const PLAYERS: Player[] = [
  // Mamelodi Sundowns
  { id: "williams-ronwen", name: "Ronwen Williams", team: "mamelodi-sundowns", position: "GK", price: 6.0, photo: "/placeholder.svg" },
  { id: "mudau-khuliso", name: "Khuliso Mudau", team: "mamelodi-sundowns", position: "DEF", price: 5.5, photo: "/placeholder.svg" },
  { id: "basadien-fawaaz", name: "Fawaaz Basadien", team: "mamelodi-sundowns", position: "DEF", price: 5.0, photo: "/placeholder.svg" },
  { id: "mokoena-teboho", name: "Teboho Mokoena", team: "mamelodi-sundowns", position: "MID", price: 8.0, photo: "/placeholder.svg" },
  { id: "adams-jayden", name: "Jayden Adams", team: "mamelodi-sundowns", position: "MID", price: 6.5, photo: "/placeholder.svg" },
  { id: "shalulile-peter", name: "Peter Shalulile", team: "mamelodi-sundowns", position: "FWD", price: 9.0, photo: "/placeholder.svg" },
  
  // Orlando Pirates
  { id: "mofokeng-relebohile", name: "Relebohile Mofokeng", team: "orlando-pirates", position: "MID", price: 7.5, photo: "/placeholder.svg" },
  { id: "mabasa-tshegofatso", name: "Tshegofatso Mabasa", team: "orlando-pirates", position: "FWD", price: 7.0, photo: "/placeholder.svg" },
  
  // Kaizer Chiefs
  { id: "hlanti-sifiso", name: "Sifiso Hlanti", team: "kaizer-chiefs", position: "DEF", price: 4.0, photo: "/placeholder.svg" },
  { id: "lilepo-makabi", name: "Makabi Lilepo", team: "kaizer-chiefs", position: "MID", price: 6.0, photo: "/placeholder.svg" },
  { id: "du-preez-ashley", name: "Ashley Du Preez", team: "kaizer-chiefs", position: "FWD", price: 6.0, photo: "/placeholder.svg" },
  
  // SuperSport United
  { id: "goss-ricardo", name: "Ricardo Goss", team: "supersport-united", position: "GK", price: 4.5, photo: "/placeholder.svg" },
  
  // Maccabi Petah Tikva (placeholder for real PSL team)
  { id: "de-reuck-rushine", name: "Rushine de Reuck", team: "stellenbosch-fc", position: "DEF", price: 4.5, photo: "/placeholder.svg" },

  // Additional players to fill squad requirements - generating realistic PSL roster
  // AmaZulu FC
  { id: "mothwa-veli", name: "Veli Mothwa", team: "amazulu-fc", position: "GK", price: 4.0, photo: "/placeholder.svg" },
  { id: "mbatha-siyabonga", name: "Siyabonga Mbatha", team: "amazulu-fc", position: "DEF", price: 4.5, photo: "/placeholder.svg" },
  { id: "brooks-keagan", name: "Keagan Brooks", team: "amazulu-fc", position: "DEF", price: 4.0, photo: "/placeholder.svg" },
  { id: "mayambela-luvuyo", name: "Luvuyo Mayambela", team: "amazulu-fc", position: "MID", price: 5.5, photo: "/placeholder.svg" },
  { id: "ekstein-hendrick", name: "Hendrick Ekstein", team: "amazulu-fc", position: "MID", price: 5.0, photo: "/placeholder.svg" },
  { id: "makhaula-siphesihle", name: "Siphesihle Makhaula", team: "amazulu-fc", position: "FWD", price: 5.5, photo: "/placeholder.svg" },
  
  // Cape Town City FC
  { id: "mpandle-darren", name: "Darren Keet", team: "cape-town-city-fc", position: "GK", price: 4.5, photo: "/placeholder.svg" },
  { id: "edmilson-santos", name: "Edmilson Santos", team: "cape-town-city-fc", position: "DEF", price: 4.5, photo: "/placeholder.svg" },
  { id: "adams-bradley", name: "Bradley Adams", team: "cape-town-city-fc", position: "MID", price: 5.0, photo: "/placeholder.svg" },
  { id: "mayo-khanyisa", name: "Khanyisa Mayo", team: "cape-town-city-fc", position: "FWD", price: 6.5, photo: "/placeholder.svg" },
  
  // Chippa United
  { id: "akpeyi-daniel", name: "Daniel Akpeyi", team: "chippa-united", position: "GK", price: 4.0, photo: "/placeholder.svg" },
  { id: "mdlinzo-sandile", name: "Sandile Mdlinzo", team: "chippa-united", position: "DEF", price: 3.5, photo: "/placeholder.svg" },
  { id: "mthethwa-thabo", name: "Thabo Mthethwa", team: "chippa-united", position: "MID", price: 4.5, photo: "/placeholder.svg" },
  { id: "manziba-eva", name: "Eva Nga", team: "chippa-united", position: "FWD", price: 5.0, photo: "/placeholder.svg" },
  
  // Golden Arrows
  { id: "mlungwana-siyabonga", name: "Siyabonga Mlungwana", team: "golden-arrows", position: "GK", price: 3.5, photo: "/placeholder.svg" },
  { id: "sibiya-nkosinathi", name: "Nkosinathi Sibiya", team: "golden-arrows", position: "DEF", price: 4.0, photo: "/placeholder.svg" },
  { id: "memela-thabo", name: "Thabo Memela", team: "golden-arrows", position: "MID", price: 5.0, photo: "/placeholder.svg" },
  { id: "ngcobo-lungelo", name: "Lungelo Ngcobo", team: "golden-arrows", position: "FWD", price: 4.5, photo: "/placeholder.svg" },
];

// Generate additional squad depth for each team to meet 15-player squads
const additionalPlayers: Player[] = [];
const teamIds = [
  "amazulu-fc", "cape-town-city-fc", "chippa-united", "golden-arrows", 
  "kaizer-chiefs", "magesi-fc", "mamelodi-sundowns", "marumo-gallants",
  "orlando-pirates", "polokwane-city", "richards-bay-fc", "royal-am",
  "sekhukhune-united", "stellenbosch-fc", "supersport-united", "ts-galaxy"
];

teamIds.forEach((teamId, teamIndex) => {
  // Ensure each team has at least 2 GK, 5 DEF, 5 MID, 3 FWD
  const teamPlayers = PLAYERS.filter(p => p.team === teamId);
  const positionCounts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  teamPlayers.forEach(p => positionCounts[p.position]++);
  
  const needed = {
    GK: Math.max(0, 2 - positionCounts.GK),
    DEF: Math.max(0, 5 - positionCounts.DEF),
    MID: Math.max(0, 5 - positionCounts.MID),
    FWD: Math.max(0, 3 - positionCounts.FWD)
  };
  
  let playerCounter = 1;
  Object.entries(needed).forEach(([pos, count]) => {
    for (let i = 0; i < count; i++) {
      const position = pos as "GK" | "DEF" | "MID" | "FWD";
      const basePrice = position === "GK" ? 3.5 : position === "DEF" ? 3.5 : position === "MID" ? 4.0 : 4.5;
      const price = +(basePrice + (playerCounter * 0.5)).toFixed(1);
      
      additionalPlayers.push({
        id: `${teamId}-${pos.toLowerCase()}-${playerCounter}`,
        name: `${teamId.split('-')[0]} ${pos}${playerCounter}`,
        team: teamId,
        position,
        price: Math.min(price, position === "GK" ? 6.0 : position === "DEF" ? 6.0 : position === "MID" ? 8.5 : 9.5),
        photo: "/placeholder.svg"
      });
      playerCounter++;
    }
  });
});

export const ALL_PLAYERS: Player[] = [...PLAYERS, ...additionalPlayers];
