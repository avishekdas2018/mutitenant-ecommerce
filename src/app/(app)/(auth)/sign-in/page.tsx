import { SingInView } from "@/modules/auth/ui/views/sign-in-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await caller.auth.session()

  if (session) {
    redirect('/')
  }

  return (
    <div>
      <SingInView/>
    </div>
  );
}




export default SignInPage;