import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { Mail, MessageSquare, User } from "lucide-react";

const formSchema = insertContactSchema;
type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { mutate, isPending } = useCreateContactMessage();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">Get in Touch</h1>
              <p className="text-xl text-muted-foreground">
                Have questions about how TravelTogether works? Want to partner with us? We'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-3 bg-blue-50 text-primary rounded-xl">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground">support@traveltogether.com</p>
                  <p className="text-muted-foreground">partners@traveltogether.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-3 bg-orange-50 text-secondary rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Live Chat</h3>
                  <p className="text-muted-foreground">Available Mon-Fri, 9am - 5pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <Card className="shadow-xl border-none">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="Jane Doe" 
                      className="pl-10 h-12" 
                      {...register("name")}
                    />
                  </div>
                  {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jane@example.com" 
                      className="pl-10 h-12" 
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    className="min-h-[150px] resize-none text-base" 
                    {...register("message")}
                  />
                  {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
