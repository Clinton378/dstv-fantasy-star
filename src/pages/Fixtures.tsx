import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Countdown } from "@/components/Countdown";

interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamShort: string;
  awayTeamShort: string;
  date: string;
  gameweek: number;
  fdr: {
    home: number;
    away: number;
  };
}

// Mock fixture data with FDR ratings based on team strength
const generateFixtures = (): Fixture[] => {
  const teams = [
    { name: "Mamelodi Sundowns", short: "SUN", strength: 1 },
    { name: "Orlando Pirates", short: "PIR", strength: 2 },
    { name: "Kaizer Chiefs", short: "CHI", strength: 3 },
    { name: "SuperSport United", short: "SSU", strength: 4 },
    { name: "Cape Town City FC", short: "CTC", strength: 5 },
    { name: "Stellenbosch FC", short: "STE", strength: 6 },
    { name: "AmaZulu FC", short: "AMA", strength: 7 },
    { name: "Sekhukhune United", short: "SEK", strength: 8 },
    { name: "Richards Bay FC", short: "RIC", strength: 9 },
    { name: "Golden Arrows", short: "ARR", strength: 10 },
    { name: "TS Galaxy", short: "TSG", strength: 11 },
    { name: "Polokwane City", short: "POL", strength: 12 },
    { name: "Royal AM", short: "ROY", strength: 13 },
    { name: "Marumo Gallants", short: "GAL", strength: 14 },
    { name: "Chippa United", short: "CHU", strength: 15 },
    { name: "Magesi FC", short: "MAG", strength: 16 },
  ];

  const fixtures: Fixture[] = [];
  let fixtureId = 1;

  // Generate fixtures for 10 gameweeks
  for (let gw = 1; gw <= 10; gw++) {
    const gwDate = new Date(2025, 7, 8 + (gw - 1) * 7); // Starting Aug 8, 2025
    
    // Generate 8 fixtures per gameweek (16 teams = 8 matches)
    for (let match = 0; match < 8; match++) {
      const homeIndex = (match * 2 + gw) % teams.length;
      const awayIndex = (match * 2 + 1 + gw) % teams.length;
      
      if (homeIndex !== awayIndex) {
        const homeTeam = teams[homeIndex];
        const awayTeam = teams[awayIndex];
        
        // Calculate FDR: stronger teams (lower strength number) = higher difficulty for opponents
        const homeFDR = Math.min(5, Math.max(1, Math.ceil(awayTeam.strength / 3.2)));
        const awayFDR = Math.min(5, Math.max(1, Math.ceil(homeTeam.strength / 3.2)));

        fixtures.push({
          id: fixtureId.toString(),
          homeTeam: homeTeam.name,
          awayTeam: awayTeam.name,
          homeTeamShort: homeTeam.short,
          awayTeamShort: awayTeam.short,
          date: gwDate.toLocaleDateString(),
          gameweek: gw,
          fdr: {
            home: homeFDR,
            away: awayFDR,
          },
        });
        fixtureId++;
      }
    }
  }

  return fixtures;
};

const FDR_COLORS = {
  1: "bg-green-500 text-white", // Easy
  2: "bg-green-400 text-white", // Favorable
  3: "bg-yellow-500 text-black", // Average
  4: "bg-red-400 text-white", // Difficult
  5: "bg-red-600 text-white", // Very Difficult
};

const Fixtures = () => {
  const [currentGameweek, setCurrentGameweek] = useState(1);
  const [fixtures] = useState<Fixture[]>(generateFixtures());
  
  const currentFixtures = fixtures.filter(f => f.gameweek === currentGameweek);
  const maxGameweek = Math.max(...fixtures.map(f => f.gameweek));

  return (
    <>
      <SEO 
        title="Fixtures & Results - Betway Fantasy PSL" 
        description="View Premier Soccer League fixtures with Fixture Difficulty Ratings (FDR) to help plan your fantasy transfers and captaincy decisions." 
      />
      <SiteHeader />
      <main className="container py-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Fixtures & Results</h1>
          <p className="text-muted-foreground">Plan your transfers with Fixture Difficulty Ratings</p>
        </div>

        {/* Countdown to next deadline */}
        <div className="flex justify-center">
          <Countdown targetDate="2025-08-15T17:30:00+02:00" />
        </div>

        <div className="flex flex-col space-y-4">
          {/* FDR Key */}
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-medium">FDR Key:</span>
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${FDR_COLORS[rating as keyof typeof FDR_COLORS]}`}>
                    {rating}
                  </div>
                  <span className="text-sm">
                    {rating === 1 && "Easy"}
                    {rating === 2 && "Favorable"} 
                    {rating === 3 && "Average"}
                    {rating === 4 && "Difficult"}
                    {rating === 5 && "Very Hard"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Gameweek Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentGameweek(prev => Math.max(1, prev - 1))}
              disabled={currentGameweek === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous GW
            </Button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold">Gameweek {currentGameweek}</h2>
              <p className="text-sm text-muted-foreground">
                {currentFixtures[0]?.date}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setCurrentGameweek(prev => Math.min(maxGameweek, prev + 1))}
              disabled={currentGameweek === maxGameweek}
            >
              Next GW
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Fixtures Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentFixtures.map((fixture) => (
              <Card key={fixture.id} className="p-4">
                <div className="space-y-3">
                  <div className="text-center text-sm text-muted-foreground">
                    {fixture.date}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{fixture.homeTeamShort}</span>
                      <span className="text-xs text-muted-foreground">(H)</span>
                      <div className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${FDR_COLORS[fixture.fdr.home as keyof typeof FDR_COLORS]}`}>
                        {fixture.fdr.home}
                      </div>
                    </div>
                    
                    <span className="text-muted-foreground text-sm">vs</span>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${FDR_COLORS[fixture.fdr.away as keyof typeof FDR_COLORS]}`}>
                        {fixture.fdr.away}
                      </div>
                      <span className="text-xs text-muted-foreground">(A)</span>
                      <span className="font-medium">{fixture.awayTeamShort}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-center text-muted-foreground">
                    {fixture.homeTeam} vs {fixture.awayTeam}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Upcoming Gameweeks Preview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Next 5 Gameweeks Preview</h3>
            <div className="grid gap-3">
              {[...Array(5)].map((_, i) => {
                const gw = currentGameweek + i + 1;
                if (gw > maxGameweek) return null;
                
                const gwFixtures = fixtures.filter(f => f.gameweek === gw);
                const avgFDR = gwFixtures.reduce((sum, f) => sum + f.fdr.home + f.fdr.away, 0) / (gwFixtures.length * 2);
                
                return (
                  <div key={gw} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <span className="font-medium">GW{gw}</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {gwFixtures[0]?.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Avg FDR:</span>
                      <Badge variant="secondary">{avgFDR.toFixed(1)}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* API Information */}
          <Card className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Live Data Integration</h4>
            <p className="text-sm text-muted-foreground">
              Ready for integration with TheSportsDB API for live PSL fixtures. 
              The system will automatically calculate FDR based on team performance data.
            </p>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Fixtures;
