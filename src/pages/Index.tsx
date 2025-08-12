import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import hero from "@/assets/dstv-hero.jpg";
import { Countdown } from "@/components/Countdown";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Index = () => {
  const spot = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = spot.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <>
      <SEO title="DStv Premiership Fantasy – Pick Your Squad" description="Build a 15-man squad with a R100m budget. Manage transfers, set your lineup, and compete in leagues—FPL-style for the DStv Premiership." />
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b">
          <div ref={spot} onMouseMove={onMouseMove} className="hero-spotlight">
            <div className="container grid lg:grid-cols-2 gap-8 py-16 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">South Africa's Fantasy Football, Reimagined</h1>
                <p className="text-lg text-muted-foreground mb-6">Draft your DStv Premiership stars, manage your team weekly, and climb the ranks. Inspired by FPL. Built for SA.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild>
                    <Link to="/squad">Pick Your Team</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link to="/rules">How Scoring Works</Link>
                  </Button>
                  <div className="mt-2 md:mt-0"><Countdown targetDate="2025-08-15T17:30:00+02:00" /></div>
                </div>
              </div>
              <Card className="p-2 bg-background/60 backdrop-blur">
                <img src={hero} alt="DStv Premiership fantasy football hero stadium under lights" loading="lazy" className="rounded-md" />
              </Card>
            </div>
          </div>
        </section>

        <section className="container py-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Salary Cap Squad</h2>
            <p className="text-sm text-muted-foreground">Assemble 15 players with a R100m budget and max 3 from any club.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Live Gameweeks</h2>
            <p className="text-sm text-muted-foreground">Set your XI before the deadline. Auto-subs ensure you always field a team.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Compete in Leagues</h2>
            <p className="text-sm text-muted-foreground">Join global rankings or private mini-leagues with friends.</p>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
