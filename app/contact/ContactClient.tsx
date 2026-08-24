"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Send, CheckCircle2, Clock } from "lucide-react";
import PageBanner from "@/components/global/PageBanner";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
}

interface ContactData {
  id: number;
  phone: string;
  email: string;
  opening_hours: string;
}

interface ContactClientProps {
  bannerData: BannerData;
  contactData: ContactData;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactClient({
  bannerData,
  contactData,
}: ContactClientProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (/^\+?[0-9\s\-()]{8,16}$/.test(formData.phone.trim()) === false) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message details are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Store the form reference before the async operation
    const form = e.currentTarget;

    setIsSubmitting(true);
    setErrors({});

    // Prepare the API payload
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    // Check exactly what is being sent
    console.log("Form Data:", formData);
    console.log("API Payload:", payload);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      console.log("API Status:", response.status);
      console.log("API Response:", result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
      }

      // Reset actual HTML form
      form.reset();

      // Reset React state
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setIsSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Contact Form Error:", error);

      alert("Unable to send enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#3592CF]/5 via-slate-50/50 to-[#FCB040]/5 relative overflow-hidden">
      {/* Header Banner */}
      <PageBanner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        breadcrumbs={[{ name: bannerData.title }]}
      />

      <section className="w-full py-16 md:py-24 relative z-10">
        {/* Background Pattern & Glow Shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none z-0" />

        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#3592CF]/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#FCB040]/5 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                  Get in Touch
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  Have questions about our services, support workers, or NDIS
                  plans? Our team is here to provide the support and answers you
                  need.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-3xl hover:border-brand-blue/30 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      Phone Support
                    </h3>

                    <p className="text-sm text-slate-500 mb-2">
                      Speak directly with our Services Management Team.
                    </p>

                    <a
                      href={`tel:${contactData.phone}`}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      {contactData.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-3xl hover:border-brand-blue/30 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      Email Inquiry
                    </h3>

                    <p className="text-sm text-slate-500 mb-2">
                      Drop us a line and we will reply within 24 hours.
                    </p>

                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex gap-4 p-5 bg-brand-blue/5 rounded-3xl border border-brand-blue/10 text-slate-700 text-sm">
                  <Clock className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />

                  <div>
                    <span className="font-bold text-slate-800">
                      Operating Hours
                    </span>

                    <p className="mt-1 text-slate-600">
                      {contactData.opening_hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10"
                  >
                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                      Send us a Message
                    </h3>

                    <p className="text-slate-500 text-sm mb-6">
                      If you have any general enquiries, questions, or would
                      like more information, feel free to fill out the form
                      below.
                    </p>

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <FormInput
                          id="name"
                          type="text"
                          name="name"
                          label="Full Name"
                          required
                          icon={User}
                          placeholder="Your Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          error={errors.name}
                        />

                        {/* Email */}
                        <FormInput
                          id="email"
                          type="email"
                          name="email"
                          label="Email Address"
                          required
                          icon={Mail}
                          placeholder="name@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          error={errors.email}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone */}
                        <FormInput
                          id="phone"
                          type="tel"
                          name="phone"
                          label="Phone Number"
                          required
                          icon={Phone}
                          placeholder="e.g. 0412 345 678"
                          value={formData.phone}
                          onChange={handleInputChange}
                          error={errors.phone}
                        />

                        {/* Subject */}
                        <FormInput
                          id="subject"
                          type="text"
                          name="subject"
                          label="Subject"
                          required
                          placeholder="Reason for contact"
                          value={formData.subject}
                          onChange={handleInputChange}
                          error={errors.subject}
                        />
                      </div>

                      {/* Message */}
                      <FormTextarea
                        id="message"
                        name="message"
                        label="Enquiry Details / Message"
                        required
                        rows={5}
                        placeholder="Provide details about your enquiry here..."
                        value={formData.message}
                        onChange={handleInputChange}
                        error={errors.message}
                      />

                      {/* Action Area */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                          By submitting this form, you authorize our team to
                          contact you. Fields marked with{" "}
                          <span className="text-red-500 font-bold">*</span> are
                          required.
                        </p>

                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-none rounded-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed bg-brand-blue text-white hover:bg-[#287cb2] whitespace-nowrap"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />

                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>

                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>Submit Enquiry</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-slate-200 rounded-3xl p-8 md:p-16 text-center max-w-2xl mx-auto"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full text-emerald-500 mb-6">
                      <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
                    </div>

                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">
                      Message Sent!
                    </h2>

                    <p className="text-slate-600 leading-relaxed mb-8">
                      Thank you for getting in touch. Your message has been
                      successfully received. Our team will review your enquiry
                      and get back to you shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button
                        onClick={resetForm}
                        variant="secondary"
                        className="w-full sm:w-auto px-6 py-3 shadow-none border border-slate-200"
                      >
                        Send Another Message
                      </Button>

                      <Button
                        href="/"
                        variant="primary"
                        className="w-full sm:w-auto px-6 py-3 shadow-none bg-brand-blue text-white hover:bg-[#287cb2]"
                      >
                        Return to Homepage
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
