import { SingUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session = await caller.auth.session()

  if (session) {
    redirect('/')
  }
  return (
    <div>
      <SingUpView />
    </div>
  );
}

export default SignUpPage;