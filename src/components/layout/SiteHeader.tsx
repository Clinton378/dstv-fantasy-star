import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
  }`;

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-secondary shadow-[var(--shadow-glow)]" aria-hidden />
          <span className="text-lg font-bold tracking-tight">DStv Fantasy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/squad" className={navLinkClass}>
            Pick Team
          </NavLink>
          <NavLink to="/fixtures" className={navLinkClass}>
            Fixtures
          </NavLink>
          <NavLink to="/leagues" className={navLinkClass}>
            Leagues
          </NavLink>
          <NavLink to="/rules" className={navLinkClass}>
            Rules
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="default">
            <Link to="/squad">Play Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
