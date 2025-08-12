import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const Rules = () => {
  return (
    <>
      <SEO title="Rules & Scoring – DStv Premiership Fantasy" description="Learn squad rules, transfers, formations, and the full scoring system adapted from Fantasy Premier League." />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Rules & Scoring</h1>
        <section className="prose prose-neutral max-w-none">
          <h2>Squad & Budget</h2>
          <ul>
            <li>15 players: 2 GK, 5 DEF, 5 MID, 3 FWD</li>
            <li>Budget: R100.0m</li>
            <li>Max 3 players per club</li>
          </ul>
          <h2>Starting XI & Formation</h2>
          <ul>
            <li>Set XI before each gameweek deadline</li>
            <li>Valid formations: 1 GK, at least 3 DEF, at least 2 MID, at least 1 FWD</li>
            <li>Auto-substitutions from bench in priority order if a starter does not play</li>
          </ul>
          <h2>Transfers</h2>
          <ul>
            <li>1 free transfer per week (max 2 can be saved)</li>
            <li>Each extra transfer costs -4 points</li>
          </ul>
          <h2>Scoring Highlights</h2>
          <p>Points for appearances, goals, assists, clean sheets, bonus (BPS), and disciplinary events. CBIT/CBIRT defensive contributions award +2 points when thresholds are met.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default Rules;
