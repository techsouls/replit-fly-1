import { Switch, Route } from "wouter";
import { AuthProvider } from "./lib/authContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PostJourney from "@/pages/PostJourney";
import SearchJourneys from "@/pages/SearchJourneys";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/post" component={PostJourney} />
      <Route path="/search" component={SearchJourneys} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
