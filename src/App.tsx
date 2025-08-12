import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Squad from "./pages/Squad";
import Rules from "./pages/Rules";
import Leagues from "./pages/Leagues";
import Fixtures from "./pages/Fixtures";
import { SEOProvider } from "./components/SEO";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SEOProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/fixtures" element={<Fixtures />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SEOProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
