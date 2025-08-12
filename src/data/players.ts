import { Player, Position } from "@/types/fantasy";
import { TEAM_IDS } from "./teams";

// Programmatically generate a realistic pool of players per team
const positions: Position[] = ["GK", "DEF", "MID", "FWD"];

function generatePlayers(): Player[] {
  const players: Player[] = [];
  let counter = 1;
  for (const { id: teamId, name } of TEAM_IDS) {
    // 1 GK, 4 DEF, 4 MID, 2 FWD per team
    const template: Record<Position, number> = { GK: 1, DEF: 4, MID: 4, FWD: 2 };

    for (const pos of positions) {
      const count = template[pos];
      for (let i = 0; i < count; i++) {
        const priceBase = pos === "GK" ? 4.0 : pos === "DEF" ? 4.5 : pos === "MID" ? 5.5 : 6.5;
        const price = +(priceBase + ((i + counter) % 4) * 0.5).toFixed(1);
        players.push({
          id: `${teamId}-${pos}-${i}`,
          name: `${name.split(" ")[0]} ${pos}${i + 1}`,
          team: teamId,
          position: pos,
          price,
          photo: "/placeholder.svg",
        });
        counter++;
      }
    }
  }
  return players;
}

export const PLAYERS: Player[] = generatePlayers();
