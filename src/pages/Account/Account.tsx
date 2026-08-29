import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Validation schema -----------------------------------------------------

const profileSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    address: z.string().trim().min(3, "Address is required"),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine((values) => !values.newPassword || values.newPassword.length >= 8, {
    message: "New password must be at least 8 characters",
    path: ["newPassword"],
  })
  .refine(
    (values) =>
      !values.newPassword || values.newPassword === values.confirmNewPassword,
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    },
  )
  .refine((values) => !values.newPassword || !!values.currentPassword, {
    message: "Enter your current password to set a new one",
    path: ["currentPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;

// Mock signed-in user. Will come from auth state once it exists.
const CURRENT_USER = {
  firstName: "Md",
  lastName: "Rimel",
  email: "rimel111@gmail.com",
  address: "Kingston, 5236, United State",
};

// --- Sidebar -----------------------------------------------------------------

const ACCOUNT_NAV = [
  {
    heading: "Manage My Account",
    links: [
      { label: "My Profile", href: "/account", active: true },
      { label: "Address Book", href: "/account/address-book" },
      { label: "My Payment Options", href: "/account/payment-options" },
    ],
  },
  {
    heading: "My Orders",
    links: [
      { label: "My Returns", href: "/account/returns" },
      { label: "My Cancellations", href: "/account/cancellations" },
    ],
  },
  {
    heading: "My WishList",
    links: [{ label: "My WishList", href: "/wishlist" }],
  },
];

function AccountSidebar() {
  return (
    <nav aria-label="Account" className="flex flex-col gap-6">
      {ACCOUNT_NAV.map(({ heading, links }) => (
        <div key={heading} className="flex flex-col gap-2">
          <h2 className="text-sm font-medium">{heading}</h2>
          <ul className="flex flex-col gap-2 pl-2">
            {links.map(({ label, href, active }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm",
                    active
                      ? "text-brand"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

// --- Form field -------------------------------------------------------------

interface FieldProps {
  label: string;
  type?: string;
  error?: string;
  registration: ReturnType<
    ReturnType<typeof useForm<ProfileFormValues>>["register"]
  >;
}

function Field({ label, type = "text", error, registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={registration.name} className="text-sm">
        {label}
      </label>
      <input
        {...registration}
        id={registration.name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        className="w-full rounded-sm bg-secondary px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {error ? (
        <p
          id={`${registration.name}-error`}
          className="text-xs text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

// --- Page --------------------------------------------------------------------

export default function Account() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: CURRENT_USER.firstName,
      lastName: CURRENT_USER.lastName,
      email: CURRENT_USER.email,
      address: CURRENT_USER.address,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    // UI-only: no real account/backend yet.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("save profile:", values);
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          Home / <span className="font-medium text-foreground">My Account</span>
        </nav>
        <p className="text-sm">
          Welcome!{" "}
          <span className="text-brand">
            {CURRENT_USER.firstName} {CURRENT_USER.lastName}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
        <AccountSidebar />

        <div className="rounded border border-border p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <h1 className="text-lg font-medium text-brand">
              Edit Your Profile
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="First Name"
                registration={register("firstName")}
                error={errors.firstName?.message}
              />
              <Field
                label="Last Name"
                registration={register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Email"
                type="email"
                registration={register("email")}
                error={errors.email?.message}
              />
              <Field
                label="Address"
                registration={register("address")}
                error={errors.address?.message}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-sm">Password Changes</h2>
              <Field
                label="Current Password"
                type="password"
                registration={register("currentPassword")}
                error={errors.currentPassword?.message}
              />
              <Field
                label="New Password"
                type="password"
                registration={register("newPassword")}
                error={errors.newPassword?.message}
              />
              <Field
                label="Confirm New Password"
                type="password"
                registration={register("confirmNewPassword")}
                error={errors.confirmNewPassword?.message}
              />
            </div>

            <div className="flex items-center justify-end gap-6">
              <button type="button" onClick={() => reset()} className="text-sm">
                Cancel
              </button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
