import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import authHero from "@/assets/auth-hero.jpg";

// --- Validation schema -----------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?\d{7,15}$/;

const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .refine(
      (value) => EMAIL_REGEX.test(value) || PHONE_REGEX.test(value),
      "Enter a valid email or phone number",
    ),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// --- Form field -------------------------------------------------------------

interface FieldProps {
  label: string;
  type?: string;
  error?: string;
  registration: ReturnType<
    ReturnType<typeof useForm<LoginFormValues>>["register"]
  >;
}

function Field({ label, type = "text", error, registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="relative">
        <span className="sr-only">{label}</span>
        <input
          {...registration}
          type={type}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${registration.name}-error` : undefined}
          className="w-full border-b border-border bg-transparent py-2 px-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-foreground"
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

export default function Login() {
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  async function onSubmit(values: LoginFormValues) {
    // UI-only: no real backend/auth yet. Simulate a request so loading state
    // has something to show.
    setLoginError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("login:", values);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] container items-center">
      <div className="hidden h-full flex-1 items-center justify-center bg-secondary lg:flex">
        <img src={authHero} alt="" className="size-full object-cover" />
      </div>

      <div className="flex w-full flex-1 flex-col gap-8 px-6 py-16 sm:px-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium">Log in to Bab Rizk</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-6">
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

          {loginError ? (
            <p role="alert" className="text-sm text-destructive">
              {loginError}
            </p>
          ) : null}

          <div className="flex items-center gap-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className=" text-white bg-btn-2 hover:bg-btn-hover px-8 py-6  text-md "
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
            <a href="/forgot-password" className="text-sm text-secondary-2">
              Forget Password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
