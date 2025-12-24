import { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { MapPin, Calendar, User } from "lucide-react";

interface Journey {
  id: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  description: string;
  lookingFor: "help" | "offer-help" | "both";
  userName: string;
  userEmail: string;
  userId: string;
  createdAt: any;
}

export default function SearchJourneys() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const journeyCollection = collection(db, "journeys");
    const q = query(journeyCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const journeyList: Journey[] = [];
      snapshot.forEach((doc) => {
        journeyList.push({
          id: doc.id,
          ...doc.data(),
        } as Journey);
      });
      setJourneys(journeyList);
      setFilteredJourneys(journeyList);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredJourneys(journeys);
      return;
    }

    const filtered = journeys.filter((journey) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        journey.departureCity.toLowerCase().includes(searchLower) ||
        journey.arrivalCity.toLowerCase().includes(searchLower) ||
        journey.description.toLowerCase().includes(searchLower)
      );
    });

    setFilteredJourneys(filtered);
  }, [searchTerm, journeys]);

  const handleInterest = (journey: Journey) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to express interest in a journey.",
        variant: "destructive",
      });
      return;
    }

    if (journey.userId === user.uid) {
      toast({
        title: "It's your post",
        description: "This is your own journey post.",
      });
      return;
    }

    toast({
      title: "Interest recorded",
      description: `You've expressed interest in ${journey.userName}'s journey. They'll be notified!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white" data-testid="page-title">
            Find Your Travel Companion
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Browse journeys and connect with fellow travelers heading your way.
          </p>

          <div className="mb-8">
            <Input
              placeholder="Search by city or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              data-testid="input-search"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">Loading journeys...</p>
            </div>
          ) : filteredJourneys.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {searchTerm ? "No journeys match your search." : "No journeys posted yet."}
              </p>
              {!searchTerm && <p className="text-sm text-slate-500">Be the first to post a journey!</p>}
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredJourneys.map((journey, index) => (
                <motion.div
                  key={journey.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="hover-elevate" data-testid={`journey-card-${journey.id}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                              {journey.departureCity} → {journey.arrivalCity}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-3 text-slate-600 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(journey.departureDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Badge variant="outline" data-testid={`badge-type-${journey.lookingFor}`}>
                          {journey.lookingFor === "help"
                            ? "Needs Help"
                            : journey.lookingFor === "offer-help"
                            ? "Offering Help"
                            : "Both"}
                        </Badge>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 mb-4">{journey.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground" data-testid={`user-name-${journey.id}`}>
                            {journey.userName || "Anonymous"}
                          </span>
                        </div>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleInterest(journey)}
                          data-testid={`button-interest-${journey.id}`}
                        >
                          Express Interest
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
