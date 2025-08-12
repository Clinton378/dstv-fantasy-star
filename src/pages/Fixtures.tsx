import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Countdown } from "@/components/Countdown";

const Fixtures = () => {
  return (
    <>
      <SEO title="Fixtures & Deadline – DStv Premiership Fantasy" description="View upcoming fixtures and track the next gameweek deadline with a live countdown." />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Fixtures & Deadline</h1>
        <div className="mb-6"><Countdown targetDate="2025-08-15T17:30:00+02:00" /></div>
        <p className="text-muted-foreground">Live fixtures and scoring will appear here. This is a frontend-only demo pending data integration.</p>
      </main>
      <SiteFooter />
    </>
  );
};

export default Fixtures;
