import { SEO } from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Leagues = () => {
  const [code, setCode] = useState("");

  return (
    <>
      <SEO title="Leagues – DStv Premiership Fantasy" description="Create private leagues, join with a code, and compete globally in head-to-head and classic formats." />
      <SiteHeader />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Leagues</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-3">
            <h2 className="text-xl font-semibold">Join a Private League</h2>
            <div className="flex gap-2">
              <Input placeholder="Enter league code" value={code} onChange={(e) => setCode(e.target.value)} />
              <Button onClick={() => toast({ title: "Joined league", description: `You joined ${code}. (Demo only)` })}>Join</Button>
            </div>
          </Card>
          <Card className="p-6 space-y-3">
            <h2 className="text-xl font-semibold">Create a Private League</h2>
            <Button onClick={() => toast({ title: "League created", description: "Share your code with friends. (Demo)" })}>Create League</Button>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default Leagues;
