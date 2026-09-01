import { useState, type SVGProps } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import authHero from "@/assets/auth-hero.jpg";

// --- Validation schema -----------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?\d{7,15}$/;

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .refine(
      (value) => EMAIL_REGEX.test(value) || PHONE_REGEX.test(value),
      "Enter a valid email or phone number",
    ),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

// --- Google "G" icon (lucide-react has no brand logos) ----------------------

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V6.9H1.4A11.9 11.9 0 0 0 0 12.2c0 1.9.5 3.7 1.4 5.3l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.9l4 3.1c.9-2.8 3.5-4.9 6.6-4.9Z"
      />
    </svg>
  );
}

// --- Form field -------------------------------------------------------------

interface FieldProps {
  label: string;
  type?: string;
  error?: string;
  registration: ReturnType<
    ReturnType<typeof useForm<SignupFormValues>>["register"]
  >;
}

function Field({ label, type = "text", error, registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="relative">
        <span className="sr-only">{label}</span>
        <input
          {...registration}
          type={type}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${registration.name}-error` : undefined}
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-foreground"
        />
      </label>
      {error ? (
        <p
          id={`${registration.name}-error`}
          className="text-xs text-red-500"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

// --- Page --------------------------------------------------------------------

export default function Signup() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", emailOrPhone: "", password: "" },
  });

  async function onSubmit(values: SignupFormValues) {
    // UI-only: no real backend/auth yet. Simulate a request so loading state
    // has something to show.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("signup:", values);
    setSubmitted(true);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] container items-center">
      <div className="hidden h-full flex-1 items-center justify-center bg-secondary lg:flex">
        <img src={authHero} alt="" className="size-full object-cover" />
      </div>

      <div className="flex w-full flex-1 flex-col gap-8 px-6 py-16 sm:px-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below
          </p>
        </div>

        {submitted ? (
          <p role="status" className="text-sm text-foreground">
            Account created. You can now log in.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <Field
                label="Name"
                registration={register("name")}
                error={errors.name?.message}
              />
              <Field
                label="Email or Phone Number"
                registration={register("emailOrPhone")}
                error={errors.emailOrPhone?.message}
              />
              <Field
                label="Password"
                type="password"
                registration={register("password")}
                error={errors.password?.message}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-btn-2 text-white hover:bg-btn-hover px-8 py-6  text-md "
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
              <Button type="button" variant="outline" className="gap-2">
                <GoogleIcon className="size-4" />
                Sign up with Google
              </Button>
            </div>
          </form>
        )}

        <p className="text-sm text-muted-foreground">
          Already have account?{" "}
          <a
            href="/login"
            className="text-foreground underline underline-offset-2"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
