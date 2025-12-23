import { useMutation } from "@tanstack/react-query";
// import { api, type InsertSubscriber } from "@shared/routes";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateSubscriber() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.subscribers.create.path, {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("This email is already subscribed.");
        }
        const error = await res.json();
        throw new Error(error.message || "Failed to subscribe");
      }

      return api.subscribers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the community!",
        description: "You've successfully joined our waitlist.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
