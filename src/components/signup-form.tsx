"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { signupSchema, SignupSchema } from "@/schemas/auth/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Info, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SparklesCore } from "./sparkles";
import { Alert, AlertTitle } from "./ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: SignupSchema) => {
    setIsLoading(true);
    try {
      const res = await api.post(`/dj-rest-auth/registration/`, {
        username: values.email,
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password1: values.password,
        password2: values.password,
      });
      console.log("🚀 ~ onSubmit ~ res:", res);
      form.reset();
      sessionStorage.setItem("accountCreated", "true");
      router.push("/login");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      if (error instanceof AxiosError) {
        const errors = error.response?.data;
        if (errors && typeof errors === "object") {
          const k = Object.keys(errors)[0];
          const message = Array.isArray(errors[k]) ? errors[k][0] : errors[k];
          toast.error(`${k}: ${message}`);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error(error instanceof Error ? error.message : "Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center min-h-screen bg-black/[0.96]",
        className
      )}
      {...props}
    >
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <Card className="w-full max-w-md border-2 border-rose-300 bg-black/[0.5] text-white z-1">
        <CardHeader className="text-center">
          <Link href={"/"}>
            <Image
              src="/logos/logo4.jpg"
              height={60}
              width={60}
              alt=""
              className="mx-auto rounded-full bg-red-200"
            />
          </Link>
          <CardTitle className="text-2xl">Register an Account</CardTitle>
          <CardDescription>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-3 bg-rose-500">
              <AlertTitle className="flex gap-1 items-center">
                <Info />
                <span>{error}</span>
              </AlertTitle>
            </Alert>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              onClick={() => setError("")}
            >
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="johndoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>New Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Confirm Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {IsLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" />
                      <span>Creating Account..</span>
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
