import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { SquadBuilder } from "@/components/fantasy/SquadBuilder";

const Squad = () => {
  return (
    <>
      <SEO title="Pick Team – DStv Premiership Fantasy" description="Build your 15-player squad within a R100m budget. Enforce formation and club limits, then set your starting XI." />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="sr-only">Pick your DStv Premiership Fantasy Team</h1>
        <SquadBuilder />
      </main>
      <SiteFooter />
    </>
  );
};

export default Squad;
