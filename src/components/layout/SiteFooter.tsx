const SiteFooter = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} DStv Premiership Fantasy (Draft)</p>
        <p className="opacity-80">Unofficial demo inspired by Fantasy Premier League</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
