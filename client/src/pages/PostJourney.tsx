import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function PostJourney() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    description: "",
    lookingFor: "both" as "help" | "offer-help" | "both",
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p className="mb-4">Please sign in to post a journey</p>
          <Button onClick={() => setLocation("/")} data-testid="button-back-home">
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const journeyCollection = collection(db, "journeys");
      
      // Check if journey already exists
      const q = query(
        journeyCollection,
        where("userId", "==", user.uid),
        where("departureCity", "==", formData.departureCity),
        where("arrivalCity", "==", formData.arrivalCity),
        where("departureDate", "==", formData.departureDate)
      );
      
      const existingDocs = await getDocs(q);
      
      if (!existingDocs.empty) {
        toast({
          title: "Journey already exists",
          description: "You already have a post for this route on this date.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      await addDoc(journeyCollection, {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        ...formData,
        createdAt: new Date(),
      });

      toast({
        title: "Journey posted!",
        description: "Your journey is now visible to other travelers.",
      });

      setLocation("/search");
    } catch (error) {
      console.error("Error posting journey:", error);
      toast({
        title: "Error",
        description: "Failed to post journey. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white" data-testid="page-title">
            Post Your Journey
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Share your travel plans and find the right companion for your trip.
          </p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departureCity">From City</Label>
                  <Input
                    id="departureCity"
                    placeholder="e.g., New York"
                    value={formData.departureCity}
                    onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                    required
                    data-testid="input-departure-city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arrivalCity">To City</Label>
                  <Input
                    id="arrivalCity"
                    placeholder="e.g., Los Angeles"
                    value={formData.arrivalCity}
                    onChange={(e) => setFormData({ ...formData, arrivalCity: e.target.value })}
                    required
                    data-testid="input-arrival-city"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departureDate">Departure Date</Label>
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  required
                  data-testid="input-departure-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Journey Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your trip, any special needs, or what kind of companion you're looking for..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  data-testid="input-description"
                />
              </div>

              <div className="space-y-3">
                <Label>What are you looking for?</Label>
                <RadioGroup value={formData.lookingFor} onValueChange={(val: any) => setFormData({ ...formData, lookingFor: val })}>
                  <div className="flex items-center space-x-2" data-testid="option-help">
                    <RadioGroupItem value="help" id="help" />
                    <Label htmlFor="help" className="font-normal cursor-pointer">
                      I need help with my journey
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="option-offer-help">
                    <RadioGroupItem value="offer-help" id="offer-help" />
                    <Label htmlFor="offer-help" className="font-normal cursor-pointer">
                      I want to help another traveler
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="option-both">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="font-normal cursor-pointer">
                      Open to both
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                data-testid="button-submit-journey"
              >
                {isSubmitting ? "Posting..." : "Post Journey"}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
