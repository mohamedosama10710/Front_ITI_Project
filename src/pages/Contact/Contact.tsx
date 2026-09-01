import React from "react";
import { useForm } from "react-hook-form";

interface ContactFormInputs {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <nav className="text-sm text-gray-500">
        Home / <span className="text-black font-medium">Contact</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-4 bg-white p-8 rounded shadow-sm border border-gray-100 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#DB4444] text-white flex items-center justify-center">
                📞
              </div>
              <h3 className="font-semibold text-base">Call To Us</h3>
            </div>
            <p className="text-sm text-black">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm text-black font-medium">
              Phone: +8801611112222
            </p>
          </div>

          <hr className="border-gray-300" />

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#DB4444] text-white flex items-center justify-center">
                ✉️
              </div>
              <h3 className="font-semibold text-base">Write To US</h3>
            </div>
            <p className="text-sm text-black leading-relaxed">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm text-black">Emails: customer@exclusive.com</p>
            <p className="text-sm text-black">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-8 bg-white p-8 rounded shadow-sm border border-gray-100">
          {isSubmitSuccessful && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded border border-green-200">
              Your message has been sent successfully!
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-[#F5F5F5] px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email *"
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-[#F5F5F5] px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Phone *"
                  {...register("phone", { required: "Phone is required" })}
                  className="w-full bg-[#F5F5F5] px-4 py-3 rounded text-sm outline-none focus:ring-1 focus:ring-[#DB4444]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <textarea
                rows={7}
                placeholder="Your Message"
                {...register("message", { required: "Message is required" })}
                className="w-full bg-[#F5F5F5] p-4 rounded text-sm outline-none focus:ring-1 focus:ring-[#DB4444] resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#DB4444] hover:bg-[#c63b3b] text-white px-12 py-4 rounded font-medium text-sm transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
