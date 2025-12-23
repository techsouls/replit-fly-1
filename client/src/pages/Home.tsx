import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";
import { Heart, Users, MapPin, ShieldCheck, Luggage, PlaneTakeoff, Quote } from "lucide-react";
import { motion } from "framer-motion";

// Schema for the form
const formSchema = insertSubscriberSchema;
type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const { mutate, isPending } = useCreateSubscriber();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "both"
    }
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        // Form is reset by react-query usually, or we can do it manually if needed
      }
    });
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract shapes/blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-6 border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Community of Travelers</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6 text-foreground">
                Travel Together, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Worry Less.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Connect with caring co-travelers who help you navigate airports, carry luggage, and provide companionship on your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                  onClick={() => document.getElementById('join-waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join the Community
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted transition-all"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  How it Works
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-[8px] border-white">
                {/* Hero image: Smiling elderly traveler with younger companion in an airport setting */}
                <img 
                  src="https://images.unsplash.com/photo-1544265476-857508496157?q=80&w=2070&auto=format&fit=crop" 
                  alt="Senior woman smiling with travel companion" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                
                {/* Floating badge */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-xs border border-white/50 hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Quote className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Sarah & Martha</p>
                      <p className="text-xs text-muted-foreground">Traveled LHR to JFK</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 italic">
                    "Sarah helped me with my bags and we chatted the whole way. It felt like traveling with a granddaughter."
                  </p>
                </div>
              </div>
              
              {/* Decorative circle */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground shadow-lg animate-bounce duration-[3000ms]">
                <Heart className="w-10 h-10 fill-current" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="py-20 bg-white" id="mission">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Our Mission</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Connecting Generations of Travelers</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe that travel should be accessible and joyful at any age. 
            By connecting elderly travelers who need a little extra help with younger, capable co-travelers, 
            we create journeys filled with support, gratitude, and meaningful connection.
          </p>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-slate-50" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Safe, Supportive</h2>
            <p className="text-lg text-muted-foreground">Three easy steps to your best travel experience yet.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10 border-t-2 border-dashed border-gray-300" />

            {/* Step 1 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative z-10 border-4 border-slate-50">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Connect</h3>
              <p className="text-muted-foreground px-4">Create a profile and find a verified travel companion on your specific flight.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative z-10 border-4 border-slate-50">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Meet</h3>
              <p className="text-muted-foreground px-4">Chat securely beforehand and meet at the airport departure gate.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative z-10 border-4 border-slate-50">
                <PlaneTakeoff className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Travel Together</h3>
              <p className="text-muted-foreground px-4">Enjoy the journey with help for bags and navigation, arriving with a smile.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DUAL VALUE PROP --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">
            {/* Left: For Elderly */}
            <div className="p-10 md:p-16 bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Luggage className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-primary">For Elderly Travelers</h3>
              <ul className="space-y-4">
                {[
                  "Assistance with heavy carry-on luggage",
                  "Help navigating confusing airport terminals",
                  "Peace of mind for you and your family",
                  "Friendly conversation during the flight"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-primary text-xs">✓</div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: For Co-Travelers */}
            <div className="p-10 md:p-16 bg-primary text-white flex flex-col justify-center">
              <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-secondary">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-white">For Co-Travelers</h3>
              <ul className="space-y-4">
                {[
                  "Earn goodwill and community recognition",
                  "Potential for travel rewards/tips (optional)",
                  "Make meaningful cross-generational connections",
                  "Turn empty flight time into helping time"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 min-w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-secondary text-xs">✓</div>
                    <span className="text-lg text-blue-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Community Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex gap-1 text-secondary mb-4">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <p className="text-muted-foreground mb-6">"My mom was traveling alone for the first time in years. Knowing John was there to help her with her bag gave our whole family peace of mind."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {/* Placeholder avatar */}
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">R</div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Rebecca S.</p>
                    <p className="text-xs text-muted-foreground">Daughter of traveler</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 md:-translate-y-4">
              <CardContent className="p-8">
                <div className="flex gap-1 text-secondary mb-4">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <p className="text-muted-foreground mb-6">"I fly this route every month for work. Helping Arthur find his gate didn't cost me any time, but his stories were the highlight of my trip."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">D</div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">David K.</p>
                    <p className="text-xs text-muted-foreground">Co-Traveler Helper</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex gap-1 text-secondary mb-4">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <p className="text-muted-foreground mb-6">"The airport is so big now, I get confused. Having a young person walk with me made me feel safe. Thank you TravelTogether."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">E</div>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Eleanor R.</p>
                    <p className="text-xs text-muted-foreground">Traveler, age 78</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SIGNUP SECTION --- */}
      <section id="join-waitlist" className="py-24 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl text-muted-foreground mb-10">
            We are launching soon in select cities. Sign up to be notified when we arrive at your airport.
          </p>

          <Card className="shadow-2xl border-white/50 backdrop-blur-sm bg-white/80">
            <CardContent className="p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">I am interested as a:</Label>
                  <RadioGroup 
                    onValueChange={(val) => setValue("role", val as "traveler" | "helper" | "both")}
                    defaultValue="both"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="traveler" id="r1" className="peer sr-only" />
                      <Label
                        htmlFor="r1"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                      >
                        <Luggage className="mb-3 h-6 w-6" />
                        Traveler
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="helper" id="r2" className="peer sr-only" />
                      <Label
                        htmlFor="r2"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                      >
                        <Heart className="mb-3 h-6 w-6" />
                        Helper
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="both" id="r3" className="peer sr-only" />
                      <Label
                        htmlFor="r3"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                      >
                        <Users className="mb-3 h-6 w-6" />
                        Both
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="you@example.com" 
                    className="h-12 text-lg bg-white" 
                    {...register("email")}
                  />
                  {errors.email && <p className="text-destructive text-sm font-medium">{errors.email.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  {isPending ? "Joining..." : "Join Waitlist"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-4">
                  We value your privacy. Unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
