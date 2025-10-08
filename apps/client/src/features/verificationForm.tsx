import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useVerification from "@/hook/useVerification";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  userId: z.uuidv4({ message: "Please add a valid user ID" }),
  credentialSecret: z
    .string()
    .min(8, "Secret must be at least 8 characters long")
    .regex(/[A-Z]/, "Secret must contain at least one uppercase letter")
    .regex(/[a-z]/, "Secret must contain at least one lowercase letter")
    .regex(/[0-9]/, "Secret must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Secret must contain at least one special character"
    ),
});

export function VerificationForm() {
  const { onSubmit } = useVerification();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      credentialSecret: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative pt-14 pb-8 px-5 w-full rounded-2xl"
      >
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Enter your user ID..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="credentialSecret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type=""
                  placeholder="Enter your secret..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end gap-2 ">
          <Button
            disabled={form.formState.isLoading || form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isLoading || form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
