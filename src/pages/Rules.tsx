import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Card } from "@/components/ui/card";

const Rules = () => {
  return (
    <>
      <SEO title="Betway Fantasy PSL 2025/26 Rules" description="Complete rules and scoring system for Betway Fantasy PSL 2025/26 season. Learn squad selection, transfers, chips, and the official scoring system." />
      <SiteHeader />
      <main className="container py-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Betway Fantasy PSL 2025/26</h1>
          <p className="text-lg text-muted-foreground">Official Rules & Scoring System</p>
          <p className="text-sm text-muted-foreground">Season: August 8, 2025 - May 23, 2026</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Squad Selection</h2>
            <div className="space-y-3 text-sm">
              <div><strong>Squad Size:</strong> 15 players</div>
              <div><strong>Budget:</strong> R100 million (ZAR)</div>
              <div><strong>Team Limit:</strong> Maximum 3 players per PSL club</div>
              <div className="pt-2">
                <div className="font-medium mb-2">Position Requirements:</div>
                <ul className="space-y-1 ml-4">
                  <li>• 2 Goalkeepers (1 starter + 1 bench)</li>
                  <li>• 5 Defenders (3-5 starters + 1-2 bench)</li>
                  <li>• 5 Midfielders (3-5 starters + 1 bench)</li>
                  <li>• 3 Forwards (1-3 starters + 0-1 bench)</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Transfers & Chips</h2>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium">Free Transfers:</div>
                <div>1 per gameweek, up to 5 can be saved</div>
              </div>
              <div>
                <div className="font-medium">Extra Transfers:</div>
                <div>-4 points penalty each</div>
              </div>
              <div className="pt-2">
                <div className="font-medium mb-2">Special Chips (1 use each):</div>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Wildcard:</strong> Unlimited transfers (2 per season)</li>
                  <li>• <strong>Triple Captain:</strong> Captain scores 3× points</li>
                  <li>• <strong>Bench Boost:</strong> All 15 players score</li>
                  <li>• <strong>Free Hit:</strong> 1 gameweek unlimited transfers</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Scoring System</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Action</th>
                  <th className="text-center py-2">GK</th>
                  <th className="text-center py-2">DEF</th>
                  <th className="text-center py-2">MID</th>
                  <th className="text-center py-2">FWD</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-2">Playing up to 60 minutes</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">1</td>
                </tr>
                <tr>
                  <td className="py-2">Playing 60+ minutes</td>
                  <td className="text-center py-2">2</td>
                  <td className="text-center py-2">2</td>
                  <td className="text-center py-2">2</td>
                  <td className="text-center py-2">2</td>
                </tr>
                <tr>
                  <td className="py-2">Goal scored</td>
                  <td className="text-center py-2">6</td>
                  <td className="text-center py-2">6</td>
                  <td className="text-center py-2">6</td>
                  <td className="text-center py-2">6</td>
                </tr>
                <tr>
                  <td className="py-2">Assist</td>
                  <td className="text-center py-2">3</td>
                  <td className="text-center py-2">3</td>
                  <td className="text-center py-2">3</td>
                  <td className="text-center py-2">3</td>
                </tr>
                <tr>
                  <td className="py-2">Clean sheet (60+ mins)</td>
                  <td className="text-center py-2">4</td>
                  <td className="text-center py-2">4</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">0</td>
                </tr>
                <tr>
                  <td className="py-2">Penalty saved</td>
                  <td className="text-center py-2">5</td>
                  <td className="text-center py-2">0</td>
                  <td className="text-center py-2">0</td>
                  <td className="text-center py-2">0</td>
                </tr>
                <tr>
                  <td className="py-2">DEFCON (per 10 CBIT, max 3)</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">1</td>
                  <td className="text-center py-2">1</td>
                </tr>
                <tr>
                  <td className="py-2">Bonus points (best 3 players)</td>
                  <td className="text-center py-2">3-1</td>
                  <td className="text-center py-2">3-1</td>
                  <td className="text-center py-2">3-1</td>
                  <td className="text-center py-2">3-1</td>
                </tr>
                <tr className="text-destructive">
                  <td className="py-2">Every 2 goals conceded</td>
                  <td className="text-center py-2">-1</td>
                  <td className="text-center py-2">-1</td>
                  <td className="text-center py-2">0</td>
                  <td className="text-center py-2">0</td>
                </tr>
                <tr className="text-destructive">
                  <td className="py-2">Penalty missed</td>
                  <td className="text-center py-2">-2</td>
                  <td className="text-center py-2">-2</td>
                  <td className="text-center py-2">-2</td>
                  <td className="text-center py-2">-2</td>
                </tr>
                <tr className="text-destructive">
                  <td className="py-2">Yellow card</td>
                  <td className="text-center py-2">-1</td>
                  <td className="text-center py-2">-1</td>
                  <td className="text-center py-2">-1</td>
                  <td className="text-center py-2">-1</td>
                </tr>
                <tr className="text-destructive">
                  <td className="py-2">Red card</td>
                  <td className="text-center py-2">-3</td>
                  <td className="text-center py-2">-3</td>
                  <td className="text-center py-2">-3</td>
                  <td className="text-center py-2">-3</td>
                </tr>
                <tr className="text-destructive">
                  <td className="py-2">Own goal</td>
                  <td className="text-center py-2">-2</td>
                  <td className="text-center py-2">-2</td>
                  <td className="text-center py-2">-2</td>
                  <td className="text-center py-2">-2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Key Terms</h2>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium">DEFCON:</div>
                <div>Defensive Contributions - 1 point per 10 Clearances, Blocks, Interceptions, and Tackles (max 3 per game)</div>
              </div>
              <div>
                <div className="font-medium">Gameweek Deadline:</div>
                <div>1 hour before kick-off of first match</div>
              </div>
              <div>
                <div className="font-medium">Valid Formation:</div>
                <div>1 GK, 3-5 DEF, 3-5 MID, 1-3 FWD (11 players total)</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Strategy Tips</h2>
            <div className="space-y-2 text-sm">
              <div>• Target Mamelodi Sundowns and Orlando Pirates for GW1</div>
              <div>• Use budget defenders to maximize midfield/forward spending</div>
              <div>• Save chips for double gameweeks and key fixtures</div>
              <div>• Monitor AFCON, MTN8, and cup competition schedules</div>
              <div>• Consider fixture difficulty ratings (FDR) for transfers</div>
            </div>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Rules;
