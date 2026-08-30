import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// --- Validation schema -----------------------------------------------------

const PHONE_REGEX = /^\+?\d{7,15}$/;

const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  companyName: z.string().trim().optional(),
  streetAddress: z.string().trim().min(3, "Street address is required"),
  apartment: z.string().trim().optional(),
  townCity: z.string().trim().min(2, "Town/City is required"),
  phoneNumber: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  saveInfo: z.boolean(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// --- Mock order data ---------------------------------------------------------
// Temporary until the cart slice exists — this page will read the real cart
// (items + totals) from Redux once that task is done.
const ORDER_ITEMS = [
  {
    id: "1",
    name: "LCD Monitor",
    price: 650,
    image: "https://placehold.co/48x48/f5f5f5/1a1a1a?text=M",
  },
  {
    id: "2",
    name: "HI Gamepad",
    price: 1100,
    image: "https://placehold.co/48x48/f5f5f5/1a1a1a?text=G",
  },
];
const SHIPPING_COST = 0; // "Free"

// --- Form field -------------------------------------------------------------

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  registration: ReturnType<
    ReturnType<typeof useForm<CheckoutFormValues>>["register"]
  >;
}

function Field({ label, required, error, registration }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={registration.name} className="text-sm">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      <input
        {...registration}
        id={registration.name}
        type="text"
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

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cod">("cod");
  const [couponCode, setCouponCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      email: "",
      saveInfo: false,
    },
  });

  const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + SHIPPING_COST;

  async function onSubmit(values: CheckoutFormValues) {
    // UI-only: no real order/payment backend yet.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("checkout:", { ...values, paymentMethod });
  }

  function handleApplyCoupon() {
    // TODO: wire to a real coupon-validation endpoint once one exists.
    console.log("apply coupon:", couponCode);
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        Account / My Account / Product / View Cart /{" "}
        <span className="font-medium text-foreground">CheckOut</span>
      </nav>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <form
          id="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <h1 className="text-2xl font-medium">Billing Details</h1>

          <Field
            label="First Name"
            required
            registration={register("firstName")}
            error={errors.firstName?.message}
          />
          <Field
            label="Company Name"
            registration={register("companyName")}
            error={errors.companyName?.message}
          />
          <Field
            label="Street Address"
            required
            registration={register("streetAddress")}
            error={errors.streetAddress?.message}
          />
          <Field
            label="Apartment, floor, etc. (optional)"
            registration={register("apartment")}
            error={errors.apartment?.message}
          />
          <Field
            label="Town/City"
            required
            registration={register("townCity")}
            error={errors.townCity?.message}
          />
          <Field
            label="Phone Number"
            required
            registration={register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
          <Field
            label="Email Address"
            required
            registration={register("email")}
            error={errors.email?.message}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("saveInfo")}
              className="size-4 accent-brand"
            />
            Save this information for faster check-out next time
          </label>
        </form>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {ORDER_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="size-10 rounded-sm object-cover"
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm">${item.price}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-3 text-sm">
              <span>Shipping:</span>
              <span>{SHIPPING_COST === 0 ? "Free" : `$${SHIPPING_COST}`}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="size-4 accent-brand"
                />
                Bank
              </span>
              {/* Placeholder labels instead of real card-network logos (trademarked assets) */}
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="rounded-sm border border-border px-1.5 py-0.5">
                  Visa
                </span>
                <span className="rounded-sm border border-border px-1.5 py-0.5">
                  Mastercard
                </span>
              </span>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="size-4 accent-brand"
              />
              Cash on delivery
            </label>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              placeholder="Coupon Code"
              className="w-full rounded-sm border border-border px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              Apply Coupon
            </Button>
          </div>

          <Button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-fit bg-brand px-12 text-brand-foreground hover:bg-brand/90"
          >
            {isSubmitting ? "Placing order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </main>
  );
}
