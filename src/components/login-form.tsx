"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginSchema, LoginSchema } from "@/schemas/auth/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { SparklesCore } from "./sparkles";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (values: LoginSchema) => {
    console.log("Form submitted with values:", values);

    const result = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.ok) {
      router.push(result.url || "/");
    } else {
      toast.error("Invalid credentials or login failed.");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    const created = sessionStorage.getItem("accountCreated");
    if (created === "true") {
      toast.success("Account created successfully!");
      sessionStorage.removeItem("accountCreated");
    }
  }, []);

  console.log(form.formState.errors);
  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center min-h-screen bg-black/[0.96] antialiased relat",
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
      <Card className="w-full max-w-sm border-2 border-rose-300 bg-black/[0.5] text-white z-1">
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

          <CardTitle className="text-2xl">
            Login into <Link href={"/"}>Pytuple</Link>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4">
              <AlertTitle className="flex gap-2 items-center">
                <Info className="w-5 h-5" />
                <span>{error}</span>
              </AlertTitle>
            </Alert>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              onClick={() => setError("")}
            >
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
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot password?
                        </a>
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
                {isSubmitting ? (
                  <span className="flex gap-1 items-center">
                    <Loader2 className="animate-spin" />
                    <span>Logging in..</span>
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </Button>
              <div className="relative flex items-center justify-center text-xs text-gray-500 uppercase">
                <span className="absolute left-0 w-full border-t" />
                <span className="relative z-10 bg-background px-2">
                  Or continue with
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="mr-2 h-5 w-5" /> Login with Google
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
