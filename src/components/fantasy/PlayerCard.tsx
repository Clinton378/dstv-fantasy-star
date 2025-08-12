import { Player } from "@/types/fantasy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlayerCardProps {
  player: Player;
  onAdd?: (p: Player) => void;
  onRemove?: (p: Player) => void;
  selected?: boolean;
  disabled?: boolean;
}

export const PlayerCard = ({ player, onAdd, onRemove, selected, disabled }: PlayerCardProps) => {
  return (
    <Card className={`p-4 group hover:shadow-[var(--shadow-elegant)] transition-shadow`}>
      <div className="flex items-center gap-3">
        <img src={player.photo} loading="lazy" alt={`${player.name} headshot - ${player.position}`} className="h-12 w-12 rounded-md object-cover" />
        <div className="flex-1">
          <p className="font-medium leading-tight">{player.name}</p>
          <p className="text-xs text-muted-foreground">{player.position} • {player.team.replace(/-/g, ' ')}</p>
        </div>
        <div className="text-sm font-semibold">R{player.price.toFixed(1)}m</div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        {!selected && onAdd && (
          <Button size="sm" onClick={() => onAdd(player)} disabled={disabled}>Add</Button>
        )}
        {selected && onRemove && (
          <Button size="sm" variant="secondary" onClick={() => onRemove(player)}>Remove</Button>
        )}
      </div>
    </Card>
  );
};
