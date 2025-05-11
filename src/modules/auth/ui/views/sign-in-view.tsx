"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema } from "../../schemas"



import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


const poppins = Poppins({
  subsets: ["latin"],
  weight:["700"]
})

export const SingInView = () => {
  const queryClient = useQueryClient();
  const router = useRouter()
  
  const trpc = useTRPC()
  const login = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
      router.push("/")
    }
  }))


  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })



  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values)
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
                <Link prefetch href={"/sign-up"}>
                  Sign up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Welcome back to Dumroad.
            </h1>
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

            <Button disabled={login.isPending} variant={"elevated"} type="submit" className="bg-black text-white hover:bg-orange-400 hover:text-primary">
              {login.isPending && (
                <Loader2 className="size-6 animate-spin mr-2"/>
              )}
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div style={{ backgroundImage: "url('/signup-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} className="h-screen w-full lg:col-span-2 hidden lg:block">
      </div>
    </div>
  )
}