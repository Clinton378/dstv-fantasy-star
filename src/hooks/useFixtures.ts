import { useState, useEffect } from "react";

export interface ApiFixture {
  idEvent: string;
  strEvent: string;
  dateEvent: string;
  strTimeLocal: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string;
}

export interface ProcessedFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamShort: string;
  awayTeamShort: string;
  date: string;
  time: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  gameweek: number;
  fdr: {
    home: number;
    away: number;
  };
}

// Team strength mapping for FDR calculation
const TEAM_STRENGTH: Record<string, number> = {
  "Mamelodi Sundowns": 1,
  "Orlando Pirates": 2,
  "Kaizer Chiefs": 3,
  "SuperSport United": 4,
  "Cape Town City": 5,
  "Stellenbosch": 6,
  "AmaZulu": 7,
  "Sekhukhune United": 8,
  "Richards Bay": 9,
  "Golden Arrows": 10,
  "TS Galaxy": 11,
  "Polokwane City": 12,
  "Royal AM": 13,
  "Marumo Gallants": 14,
  "Chippa United": 15,
  "Magesi": 16,
};

const getTeamShort = (teamName: string): string => {
  const shortNames: Record<string, string> = {
    "Mamelodi Sundowns": "SUN",
    "Orlando Pirates": "PIR", 
    "Kaizer Chiefs": "CHI",
    "SuperSport United": "SSU",
    "Cape Town City": "CTC",
    "Stellenbosch": "STE",
    "AmaZulu": "AMA",
    "Sekhukhune United": "SEK",
    "Richards Bay": "RIC",
    "Golden Arrows": "ARR",
    "TS Galaxy": "TSG",
    "Polokwane City": "POL",
    "Royal AM": "ROY",
    "Marumo Gallants": "GAL",
    "Chippa United": "CHU",
    "Magesi": "MAG",
  };
  
  return shortNames[teamName] || teamName.substring(0, 3).toUpperCase();
};

const calculateFDR = (opponentTeam: string): number => {
  const strength = TEAM_STRENGTH[opponentTeam] || 8;
  // Stronger teams (lower strength number) = higher difficulty for opponents
  return Math.min(5, Math.max(1, Math.ceil(strength / 3.2)));
};

const calculateGameweek = (dateString: string): number => {
  const matchDate = new Date(dateString);
  const seasonStart = new Date('2025-08-08'); // Season start date
  const diffTime = matchDate.getTime() - seasonStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.ceil(diffDays / 7));
};

export const useFixtures = () => {
  const [fixtures, setFixtures] = useState<ProcessedFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);
        setError(null);

        // TheSportsDB API endpoint for South African Premier Soccer League
        // League ID: 4802 (found from the website)
        const response = await fetch(
          'https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4802&s=2025-2026'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch fixtures');
        }

        const data = await response.json();
        
        if (!data.events) {
          // If no live data available, use mock data for demo
          setFixtures(generateMockFixtures());
          return;
        }

        const processedFixtures: ProcessedFixture[] = data.events.map((event: ApiFixture) => ({
          id: event.idEvent,
          homeTeam: event.strHomeTeam,
          awayTeam: event.strAwayTeam,
          homeTeamShort: getTeamShort(event.strHomeTeam),
          awayTeamShort: getTeamShort(event.strAwayTeam),
          date: new Date(event.dateEvent).toLocaleDateString(),
          time: event.strTimeLocal || 'TBD',
          homeScore: event.intHomeScore ? parseInt(event.intHomeScore) : null,
          awayScore: event.intAwayScore ? parseInt(event.intAwayScore) : null,
          status: event.strStatus,
          gameweek: calculateGameweek(event.dateEvent),
          fdr: {
            home: calculateFDR(event.strAwayTeam),
            away: calculateFDR(event.strHomeTeam),
          },
        }));

        setFixtures(processedFixtures);
      } catch (err) {
        console.error('Error fetching fixtures:', err);
        setError('Failed to load fixtures. Using mock data.');
        // Fallback to mock data
        setFixtures(generateMockFixtures());
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  return { fixtures, loading, error };
};

// Fallback mock data generator
const generateMockFixtures = (): ProcessedFixture[] => {
  const teams = Object.keys(TEAM_STRENGTH);
  const fixtures: ProcessedFixture[] = [];
  let fixtureId = 1;

  for (let gw = 1; gw <= 10; gw++) {
    const gwDate = new Date(2025, 7, 8 + (gw - 1) * 7);
    
    for (let match = 0; match < 8; match++) {
      const homeIndex = (match * 2 + gw) % teams.length;
      const awayIndex = (match * 2 + 1 + gw) % teams.length;
      
      if (homeIndex !== awayIndex) {
        const homeTeam = teams[homeIndex];
        const awayTeam = teams[awayIndex];
        
        fixtures.push({
          id: fixtureId.toString(),
          homeTeam,
          awayTeam,
          homeTeamShort: getTeamShort(homeTeam),
          awayTeamShort: getTeamShort(awayTeam),
          date: gwDate.toLocaleDateString(),
          time: '15:00',
          homeScore: null,
          awayScore: null,
          status: 'Not Started',
          gameweek: gw,
          fdr: {
            home: calculateFDR(awayTeam),
            away: calculateFDR(homeTeam),
          },
        });
        fixtureId++;
      }
    }
  }

  return fixtures;
};