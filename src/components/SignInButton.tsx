import { signInAction } from "@/lib/actions";

function SignInButton() {
  // now we access the sign in function here
  // with on click but it will make this client side
  // but we want server component
  // achieved by server component
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
