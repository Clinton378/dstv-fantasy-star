import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Player, Position, SQUAD_LIMITS, FORMATIONS, Formation } from "@/types/fantasy";
import { ALL_PLAYERS } from "@/data/players";
import { PlayerCard } from "./PlayerCard";

const STORAGE_KEY = "dstv-fantasy-squad-v1";

interface SquadState {
  players: string[]; // player ids length 15
  starts: Set<string>; // starting XI ids
  formation: Formation;
}

const defaultFormation = FORMATIONS[0];

function readState(): SquadState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { players: string[]; starts: string[]; formation: Formation };
    return { players: parsed.players, starts: new Set(parsed.starts), formation: parsed.formation };
  } catch {
    return null;
  }
}

function writeState(state: SquadState) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ players: state.players, starts: Array.from(state.starts), formation: state.formation })
  );
}

export const SquadBuilder = () => {
  const [query, setQuery] = useState("");
  const [posFilter, setPosFilter] = useState<Position | "ALL">("ALL");
  const [formation, setFormation] = useState<Formation>(defaultFormation);
  const [selected, setSelected] = useState<string[]>([]);
  const [starts, setStarts] = useState<Set<string>>(new Set());

  const byId = useMemo(() => new Map(ALL_PLAYERS.map((p) => [p.id, p])), []);

  useEffect(() => {
    const saved = readState();
    if (saved) {
      // Filter out invalid player IDs that might exist from old data
      const validPlayerIds = saved.players.filter(id => byId.has(id));
      const validStarters = new Set(Array.from(saved.starts).filter(id => byId.has(id)));
      
      setSelected(validPlayerIds);
      setStarts(validStarters);
      setFormation(saved.formation);
    }
  }, [byId]);

  useEffect(() => {
    writeState({ players: selected, starts, formation });
  }, [selected, starts, formation]);

  const budgetUsed = useMemo(() => selected.reduce((sum, id) => sum + (byId.get(id)?.price ?? 0), 0), [selected, byId]);
  const budgetLeft = +(SQUAD_LIMITS.budget - budgetUsed).toFixed(1);

  const counts = useMemo(() => {
    const c: Record<Position, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    for (const id of selected) {
      const pos = byId.get(id)?.position as Position;
      c[pos]++;
    }
    return c;
  }, [selected, byId]);

  const teamCount = useMemo(() => {
    const m = new Map<string, number>();
    for (const id of selected) {
      const team = byId.get(id)?.team as string;
      m.set(team, (m.get(team) ?? 0) + 1);
    }
    return m;
  }, [selected, byId]);

  const canAdd = (p: Player) => {
    if (selected.length >= SQUAD_LIMITS.total) return false;
    if (selected.includes(p.id)) return false;
    if (counts[p.position] >= SQUAD_LIMITS[p.position]) return false;
    if ((teamCount.get(p.team) ?? 0) >= SQUAD_LIMITS.teamMax) return false;
    if (budgetLeft - p.price < 0) return false;
    return true;
  };

  const add = (p: Player) => {
    if (!canAdd(p)) {
      toast({ title: "Cannot add player", description: "Check position, team limit, or budget." });
      return;
    }
    setSelected((prev) => [...prev, p.id]);
  };

  const remove = (p: Player) => {
    setSelected((prev) => prev.filter((id) => id !== p.id));
    setStarts((prev) => {
      const s = new Set(prev);
      s.delete(p.id);
      return s;
    });
  };

  const toggleStart = (id: string) => {
    const p = byId.get(id);
    if (!p) return; // Safety check
    const next = new Set(starts);
    if (next.has(id)) {
      next.delete(id);
    } else {
      // enforce formation counts and 11 starters
      const current = Array.from(next).map((pid) => byId.get(pid)).filter(Boolean).map(p => p!.position);
      const count: Record<Position, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
      current.forEach((pos) => (count[pos]++));
      if (current.length >= 11) return;
      if (p.position === "GK" && count.GK >= 1) return;
      if (p.position === "DEF" && count.DEF >= formation.def) return;
      if (p.position === "MID" && count.MID >= formation.mid) return;
      if (p.position === "FWD" && count.FWD >= formation.fwd) return;
      next.add(id);
    }
    setStarts(next);
  };

  const filtered = useMemo(() => {
    return ALL_PLAYERS.filter((p) =>
      (posFilter === "ALL" || p.position === posFilter) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) || p.team.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, posFilter]);

  const isSquadComplete = selected.length === SQUAD_LIMITS.total;

  const startersCount = starts.size;
  const formationValid = (() => {
    const count: Record<Position, number> = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    for (const id of starts) {
      const player = byId.get(id);
      if (player) count[player.position]++;
    }
    return (
      count.GK === 1 &&
      count.DEF === formation.def &&
      count.MID === formation.mid &&
      count.FWD === formation.fwd &&
      startersCount === 11
    );
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Build your Betway Fantasy PSL squad</h2>
              <p className="text-sm text-muted-foreground">Budget R{SQUAD_LIMITS.budget}M ZAR • Max 3 per PSL club</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium">Budget left:</span>
               <span className={`px-2 py-1 rounded-md border ${budgetLeft < 0 ? "border-destructive text-destructive" : "border-border"}`}>
                R{budgetLeft.toFixed(1)}M
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div>GK: {counts.GK}/{SQUAD_LIMITS.GK}</div>
            <div>DEF: {counts.DEF}/{SQUAD_LIMITS.DEF}</div>
            <div>MID: {counts.MID}/{SQUAD_LIMITS.MID}</div>
            <div>FWD: {counts.FWD}/{SQUAD_LIMITS.FWD}</div>
            <div>Total: {selected.length}/{SQUAD_LIMITS.total}</div>
          </div>
        </Card>

        <Card className="p-4">
          <Tabs defaultValue="pool">
            <TabsList>
              <TabsTrigger value="pool">Player Pool</TabsTrigger>
              <TabsTrigger value="selected">Your Squad</TabsTrigger>
            </TabsList>
            <TabsContent value="pool" className="space-y-4 mt-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px]">
                  <Input placeholder="Search players or teams" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <Select value={posFilter} onValueChange={(v) => setPosFilter(v as any)}>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="All positions" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All positions</SelectItem>
                    <SelectItem value="GK">Goalkeepers</SelectItem>
                    <SelectItem value="DEF">Defenders</SelectItem>
                    <SelectItem value="MID">Midfielders</SelectItem>
                    <SelectItem value="FWD">Forwards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.slice(0, 60).map((p) => (
                  <PlayerCard key={p.id} player={p} onAdd={add} selected={selected.includes(p.id)} disabled={!canAdd(p)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="selected" className="space-y-4 mt-4">
              {selected.length === 0 && (
                <p className="text-sm text-muted-foreground">No players selected yet.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selected.map((id) => {
                  const p = byId.get(id);
                  if (!p) return null; // Skip invalid player IDs
                  const isStarting = starts.has(id);
                  return (
                    <Card key={id} className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={p.photo} loading="lazy" alt={`${p.name} headshot - ${p.position}`} className="h-10 w-10 rounded-md" />
                        <div>
                          <p className="font-medium leading-tight">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.position} • {p.team.replace(/-/g, ' ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant={isStarting ? "default" : "secondary"} onClick={() => toggleStart(id)}>
                          {isStarting ? "Starting" : "Bench"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(p)}>Remove</Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Formation & Lineup</h3>
          <div className="flex items-center gap-2">
            <Select
              value={`${formation.def}-${formation.mid}-${formation.fwd}`}
              onValueChange={(v) => setFormation(() => {
                const [def, mid, fwd] = v.split("-").map((n) => parseInt(n, 10));
                // reset starters if invalid with new formation
                setStarts((prev) => new Set(Array.from(prev).slice(0, 0)));
                return { def, mid, fwd };
              })}
            >
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Formation" /></SelectTrigger>
              <SelectContent>
                {FORMATIONS.map((f) => (
                  <SelectItem key={`${f.def}-${f.mid}-${f.fwd}`} value={`${f.def}-${f.mid}-${f.fwd}`}>
                    {f.def}-{f.mid}-{f.fwd}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">Select your starting XI according to the chosen formation.</div>
          <div className="rounded-lg border p-3">
            <p className="text-sm font-medium mb-2">Starters: {startersCount}/11</p>
            {!formationValid && (
              <p className="text-xs text-destructive">Lineup incomplete or invalid. 1 GK, {formation.def} DEF, {formation.mid} MID, {formation.fwd} FWD required.</p>
            )}
          </div>
          <Button disabled={!isSquadComplete || !formationValid} onClick={() => toast({ title: "Team saved", description: "Your squad and lineup are stored locally." })}>
            Save Team
          </Button>
        </Card>

        <Card className="p-4 text-sm text-muted-foreground">
          <p className="mb-1 font-medium text-foreground">Betway Fantasy PSL Rules</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>15-player squad • R100M ZAR budget</li>
            <li>Max 3 players per PSL club</li>
            <li>Valid XI: 1 GK, 3-5 DEF, 3-5 MID, 1-3 FWD</li>
            <li>1 free transfer per gameweek (up to 5 saved)</li>
            <li>Chips: Wildcard (2×), Triple Captain, Bench Boost, Free Hit</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
