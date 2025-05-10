"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from "../../schemas"



import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


const poppins = Poppins({
  subsets: ["latin"],
  weight:["700"]
})

export const SingUpView = () => {
  const router = useRouter()
  const trpc = useTRPC()
  const register = useMutation(trpc.auth.register.mutationOptions({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      router.push("/")
    }
  }))




  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    }
  })

  const username = form.watch("username")
  const userNameErrors = form.formState.errors.username

  const showPreview = username && !userNameErrors



  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-4 gap-8 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <Link href={"/"}>
                <span className={cn(
                  "text-2xl font-semibold", poppins.className
                )}>dumroad</span>
              </Link>
              <Button variant={"ghost"} className="text-base underline border-none" asChild>
                <Link prefetch href={"/sign-in"}>
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1000+ creators earning money on Dumroad.
            </h1>
            <FormField name="username" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Username</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormDescription className={cn("hidden", showPreview && "block")}>
                  Your store will be available at&nbsp;
                  <strong>{username}</strong> 
                </FormDescription>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>

            <Button  disabled={register.isPending} variant={"elevated"} type="submit" className="bg-black text-white hover:bg-pink-400 hover:text-primary">
              {register.isPending && (
                <Loader2 className="size-6 animate-spin mr-2"/>
              )}
              Create your account
            </Button>
          </form>
        </Form>
      </div>
      <div style={{ backgroundImage: "url('/signup-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} className="h-screen w-full lg:col-span-2 hidden lg:block">
      </div>
    </div>
  )
}