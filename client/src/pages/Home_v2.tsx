import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/authContext";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Heart, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { user, loading } = useAuth();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const features = [
    {
      icon: Heart,
      title: "For Travelers Needing Help",
      description: "Get assistance with luggage, navigation, and airport logistics from caring co-travelers.",
    },
    {
      icon: Users,
      title: "For Helpful Travelers",
      description: "Make meaningful connections and help elderly travelers while earning goodwill.",
    },
    {
      icon: MapPin,
      title: "Real Connections",
      description: "Connect with verified travelers on your route. Build friendships across generations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary" data-testid="logo">Wingman</h1>
          <div className="flex gap-4">
            {user ? (
              <>
                <Link href="/post">
                  <Button size="sm" variant="ghost" data-testid="nav-post">
                    Post Journey
                  </Button>
                </Link>
                <Link href="/search">
                  <Button size="sm" variant="ghost" data-testid="nav-search">
                    Search
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button size="sm" variant="outline" data-testid="nav-profile">
                    Profile
                  </Button>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-4 pt-32 pb-20 sm:pt-40 sm:pb-32 text-center"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white" data-testid="hero-title">
          Travel Together, Worry Less
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          Connect with fellow travelers who understand. Get help when you need it. Lend a hand when you can.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {loading ? (
            <p className="text-slate-600 dark:text-slate-400">Loading...</p>
          ) : user ? (
            <>
              <Link href="/post">
                <Button size="lg" data-testid="button-post-journey">
                  Post Your Journey
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" data-testid="button-search-journeys">
                  Find Companions
                </Button>
              </Link>
            </>
          ) : (
            <Button size="lg" onClick={handleSignIn} data-testid="button-sign-in">
              Sign In with Google
            </Button>
          )}
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            We believe travel should connect generations. That's why we built a platform where elderly travelers get the support they need, and thoughtful co-travelers find meaningful ways to help.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 hover-elevate">
                <feature.icon className="w-8 h-8 mb-4 text-primary" data-testid={`icon-feature-${index}`} />
                <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Sign In", desc: "Create your profile using Google" },
              { step: 2, title: "Post or Search", desc: "Share your journey or find companions" },
              { step: 3, title: "Connect", desc: "Meet travelers and explore together" },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: item.step * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg" data-testid={`step-${item.step}`}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
