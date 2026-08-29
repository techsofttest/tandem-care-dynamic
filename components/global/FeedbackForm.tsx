"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

import { FormInput } from "@/components/ui/FormInput";
import { FormTextarea } from "@/components/ui/FormTextarea";
import { FormSelect } from "@/components/ui/FormSelect";
import Button from "@/components/ui/Button";

interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  feedbackType: string;
  message: string;
}

const INITIAL_FORM_STATE: FeedbackFormData = {
  name: "",
  email: "",
  phone: "",
  feedbackType: "Suggestion",
  message: "",
};

export default function FeedbackForm() {
  const [formData, setFormData] =
    useState<FeedbackFormData>(INITIAL_FORM_STATE);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FeedbackFormData, string>>
  >({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = ["Suggestion", "Compliment", "Complaint", "Other"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FeedbackFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FeedbackFormData, string>> = {};

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (
      formData.phone.trim() &&
      !/^\+?[0-9\s\-()]{8,16}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.feedbackType) {
      newErrors.feedbackType = "Please select a feedback type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Feedback details are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorEl = document.querySelector(".form-error-msg");

      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    // Store form reference before async operation
    const form = e.currentTarget;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

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
      alert("Unable to submit feedback. Please try again.");
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
    <AnimatePresence mode="wait">
      {!isSubmitted ? (
        <motion.div
          key="feedback-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10"
        >
          <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">
            Share Your Feedback
          </h3>

          <p className="text-slate-500 text-sm mb-6">
            We value your input. Please fill out the form below to help us
            improve our services.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                id="feedbackType"
                name="feedbackType"
                label="Feedback Type"
                required
                icon={HelpCircle}
                options={feedbackTypes}
                value={formData.feedbackType}
                onChange={handleInputChange}
                error={errors.feedbackType}
              />

              <FormInput
                id="name"
                type="text"
                name="name"
                label="Full Name (Optional)"
                icon={User}
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                id="email"
                type="email"
                name="email"
                label="Email Address (Optional)"
                icon={Mail}
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />

              <FormInput
                id="phone"
                type="tel"
                name="phone"
                label="Phone Number (Optional)"
                icon={Phone}
                placeholder="e.g. 0412 345 678"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
              />
            </div>

            <FormTextarea
              id="message"
              name="message"
              label="Your Feedback / Comments"
              required
              rows={5}
              placeholder="Please provide detailed feedback here..."
              value={formData.message}
              onChange={handleInputChange}
              error={errors.message}
            />

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                You can choose to remain anonymous by leaving the contact fields
                blank.
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
                    <span>Submit Feedback</span>
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
            Feedback Submitted!
          </h2>

          <p className="text-slate-600 leading-relaxed mb-8">
            Thank you for sharing your thoughts with us. Your feedback helps us
            continuously improve the quality of our care.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={resetForm}
              variant="secondary"
              className="w-full sm:w-auto px-6 py-3 shadow-none border border-slate-200"
            >
              Submit More Feedback
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
  );
}
