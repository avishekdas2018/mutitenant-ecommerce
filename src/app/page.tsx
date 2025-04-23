import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";


export default function Home() {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-3xl font-bold">Hello World</h1>
      <p className="text-lg text-rose-500">This is a simple Next.js app with Tailwind CSS and Radix UI.</p>
      Hello World
      <Button variant={"elevated"}>Click Me!</Button>
      <div>
        <Input placeholder=""></Input>
      </div>
      <div>
        <Progress value={50} className="w-56" />
      </div>
    </div>
  );
}
