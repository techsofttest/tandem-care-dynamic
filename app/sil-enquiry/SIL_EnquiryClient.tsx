"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Home,
  Check,
  ChevronDown,
  AlertCircle,
  Info,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
} from "lucide-react";
import PageBanner from "@/components/global/PageBanner";
import Button from "@/components/ui/Button";

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  referredPerson: string;
  hasNdisPlan: string;
  fundingSource: string;
  otherFundingSource: string;
  servicesNeeded: string[];
  preferredAreas: string[];
  interestedInTour: string;
  source: string;
  otherSource: string;
  comments: string;
}

interface SilEnquiryClientProps {
  bannerData: BannerData;
  services: ServiceOption[];
}

interface ServiceOption {
  id: number;
  title: string;
  slug: string;
  description: string;
}

const INITIAL_FORM_STATE: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  referredPerson: "",
  hasNdisPlan: "",
  fundingSource: "",
  otherFundingSource: "",
  servicesNeeded: [],
  preferredAreas: [],
  interestedInTour: "",
  source: "",
  otherSource: "",
  comments: "",
};

export default function Sil_EnquiryClient({
  bannerData,
  services,
}: SilEnquiryClientProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Options
  const roleOptions = [
    "Person with disability",
    "Family member",
    "Support Coordinator",
    "Legal Guardian",
    "Other",
  ];

  const referralOptions = [
    "Myself",
    "My child",
    "My relative",
    "A client / participant",
    "Other",
  ];

  const ndisPlanOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "Unsure", value: "Unsure" },
  ];

  const fundingSourceOptions = [
    "NDIS",
    "DSOA",
    "ICWA",
    "Department of Child Protection",
    "Department of Communities",
    "Unsure",
    "Other funding source",
  ];

  const areaOptions = [
    { label: "North Perth", value: "North" },
    { label: "East Perth", value: "East" },
    { label: "South Perth", value: "South" },
    {
      label: "Anywhere in Perth metro area",
      value: "Anywhere in Perth metro area",
    },
  ];

  const tourOptions = [
    {
      label: "Yes, I want to be invited to the next Affinity Care WA Home Open",
      value: "Yes, I want to be invited to the next Affinity Care WA Home Open",
    },
    {
      label: "No, I already know the benefits of SDA housing",
      value: "No, I already know the benefits of SDA housing",
    },
  ];

  const sourceOptions = [
    "Social media",
    "Google",
    "Support Coordinator / Plan Manager",
    "Word of Mouth",
    "Email from Affinity Care WA",
    "Post / mail",
    "Event / Expo",
    "Radio",
    "Other",
  ];

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectOption = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCheckboxToggle = (
    field: "servicesNeeded" | "preferredAreas",
    value: string,
  ) => {
    setFormData((prev) => {
      const currentList = prev[field] as string[];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      // Clear error if selection is made
      if (errors[field]) {
        setErrors((e) => ({ ...e, [field]: "" }));
      }

      return { ...prev, [field]: newList };
    });
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{8,16}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.role) newErrors.role = "Please specify your role";
    if (!formData.referredPerson)
      newErrors.referredPerson = "Please select who you are referring";
    if (!formData.hasNdisPlan)
      newErrors.hasNdisPlan = "Please select your NDIS plan status";
    if (!formData.fundingSource)
      newErrors.fundingSource = "Please select your funding source";
    if (
      formData.fundingSource === "Other funding source" &&
      !formData.otherFundingSource.trim()
    ) {
      newErrors.otherFundingSource = "Please detail your other funding source";
    }
    if (formData.servicesNeeded.length === 0)
      newErrors.servicesNeeded = "Please select at least one service option";
    if (formData.preferredAreas.length === 0)
      newErrors.preferredAreas = "Please select at least one preferred area";
    if (!formData.interestedInTour)
      newErrors.interestedInTour =
        "Please choose an option regarding SDA tours";
    if (!formData.source)
      newErrors.source = "Please select how you heard about us";
    if (formData.source === "Other" && !formData.otherSource.trim()) {
      newErrors.otherSource = "Please specify how you heard about us";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
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

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sil-enquiry`,
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

      if (!response.ok) {
        if (result.errors) {
          const backendErrors: Partial<Record<keyof FormData, string>> = {};

          Object.entries(result.errors).forEach(([key, value]) => {
            const formKeyMap: Record<string, keyof FormData> = {
              firstName: "firstName",
              lastName: "lastName",
              email: "email",
              phone: "phone",
              role: "role",
              referredPerson: "referredPerson",
              hasNdisPlan: "hasNdisPlan",
              fundingSource: "fundingSource",
              otherFundingSource: "otherFundingSource",
              servicesNeeded: "servicesNeeded",
              preferredAreas: "preferredAreas",
              interestedInTour: "interestedInTour",
              source: "source",
              otherSource: "otherSource",
              comments: "comments",
            };

            const formKey = formKeyMap[key];

            if (formKey) {
              backendErrors[formKey] = Array.isArray(value)
                ? value[0]
                : String(value);
            }
          });

          setErrors(backendErrors);

          setTimeout(() => {
            const firstErrorEl = document.querySelector(".form-error-msg");

            if (firstErrorEl) {
              firstErrorEl.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 100);
        } else {
          alert(result.message || "Something went wrong.");
        }

        return;
      }

      setIsSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      alert("Unable to submit your enquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Header Banner */}
      <PageBanner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        breadcrumbs={[{ name: bannerData.title }]}
      />

      <section className="w-full py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-6 lg:px-20 max-w-[90rem]">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="enquiry-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12"
                >
                  {/* Introduction Details */}
                  <div className="mb-10 pb-8 border-b border-slate-100">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4">
                      Supported Independent Living (SIL) Enquiry
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Complete this form if you are interested in NDIS Supported
                      Independent Living (SIL). Our dedicated accommodation team
                      will review your requirements and get in touch with you
                      shortly.
                    </p>

                    {/* <div className="flex flex-col sm:flex-row gap-4 p-5 bg-brand-blue/5 rounded-2xl border border-brand-blue/15 text-slate-700 text-sm">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800">
                            Need help?{" "}
                          </span>
                          For more information, contact our Participant
                          Engagement Department on{" "}
                          <a
                            href="mailto:enquire@affinitycarewa.com.au"
                            className="text-brand-blue font-semibold hover:underline"
                          >
                            enquire@affinitycarewa.com.au
                          </a>{" "}
                          or call{" "}
                          <a
                            href="tel:+61434693751"
                            className="text-brand-blue font-semibold hover:underline"
                          >
                            +61 434 693 751
                          </a>
                          .
                        </div>
                      </div>
                    </div> */}
                    
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-10"
                    noValidate
                  >
                    {/* SECTION 1: Personal Details */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>1. Contact Details</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="firstName"
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="John"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.firstName
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.firstName && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.firstName}
                            </span>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="lastName"
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Doe"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.lastName
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.lastName && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.lastName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Your Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john.doe@example.com"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.email
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.email && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.email}
                            </span>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="phone"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="e.g. 0412 345 678"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.phone
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.phone && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* I am a... (Modern pill options instead of plain radios) */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3">
                          I am a... <span className="text-red-500">*</span>
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {roleOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleSelectOption("role", option)}
                              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.role === option
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {errors.role && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.role}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* SECTION 2: Referral Details */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>2. Referral &amp; Plan Information</span>
                      </h3>

                      {/* Who are you referring? */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3">
                          Who are you referring?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {referralOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                handleSelectOption("referredPerson", option)
                              }
                              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.referredPerson === option
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        {errors.referredPerson && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.referredPerson}
                          </span>
                        )}
                      </div>

                      {/* NDIS Plan Status */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3">
                          Do you / the individual you represent, have an NDIS
                          plan? <span className="text-red-500">*</span>
                        </span>
                        <div className="grid grid-cols-3 max-w-md gap-3">
                          {ndisPlanOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                handleSelectOption("hasNdisPlan", opt.value)
                              }
                              className={`px-4 py-3 rounded-xl text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.hasNdisPlan === opt.value
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        {errors.hasNdisPlan && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.hasNdisPlan}
                          </span>
                        )}
                      </div>

                      {/* Funding Source */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3">
                          What is your / their funding source?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {fundingSourceOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                handleSelectOption("fundingSource", opt)
                              }
                              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.fundingSource === opt
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {/* Sub-input if 'Other funding source' selected */}
                        {formData.fundingSource === "Other funding source" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4"
                          >
                            <label
                              htmlFor="otherFundingSource"
                              className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider"
                            >
                              Please Specify Other Funding Source{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="otherFundingSource"
                              type="text"
                              name="otherFundingSource"
                              value={formData.otherFundingSource}
                              onChange={handleInputChange}
                              placeholder="Detail funding scheme here..."
                              className={`w-full px-4 py-3 rounded-xl border ${
                                errors.otherFundingSource
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                            {errors.otherFundingSource && (
                              <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5" />{" "}
                                {errors.otherFundingSource}
                              </span>
                            )}
                          </motion.div>
                        )}
                        {errors.fundingSource && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.fundingSource}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* SECTION 3: Service Preferences */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>3. Service Preferences</span>
                      </h3>

                      {/* What services are you looking for? */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-1">
                          What services are you looking for?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <span className="block text-xs text-slate-500 mb-4">
                          You can tick both options if you wish.
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {services.map((service) => {
                            const isChecked = formData.servicesNeeded.includes(
                              service.id.toString(),
                            );

                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() =>
                                  handleCheckboxToggle(
                                    "servicesNeeded",
                                    service.id.toString(),
                                  )
                                }
                                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex gap-4 items-start ${
                                  isChecked
                                    ? "border-brand-blue bg-brand-blue/5"
                                    : "border-slate-300 hover:border-slate-400 bg-white"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isChecked
                                      ? "bg-brand-blue border-brand-blue text-white"
                                      : "border-slate-300 bg-white"
                                  }`}
                                >
                                  {isChecked && (
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  )}
                                </div>
                                <div>
                                  <span
                                    className={`block font-bold text-sm md:text-base ${isChecked ? "text-brand-blue" : "text-slate-800"}`}
                                  >
                                    {service.title}
                                  </span>
                                  <span className="block text-xs text-slate-500 mt-1 leading-relaxed">
                                    {service.description}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.servicesNeeded && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.servicesNeeded}
                          </span>
                        )}
                      </div>

                      {/* Accommodation areas */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-1">
                          Where is your preferred disability accommodation area
                          in Perth? <span className="text-red-500">*</span>
                        </span>
                        <span className="block text-xs text-slate-500 mb-4">
                          You may select multiple locations.
                        </span>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          {areaOptions.map((opt) => {
                            const isChecked = formData.preferredAreas.includes(
                              opt.value,
                            );
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() =>
                                  handleCheckboxToggle(
                                    "preferredAreas",
                                    opt.value,
                                  )
                                }
                                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                                  isChecked
                                    ? "border-brand-blue bg-brand-blue/5"
                                    : "border-slate-300 hover:border-slate-400 bg-white"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                    isChecked
                                      ? "bg-brand-blue border-brand-blue text-white"
                                      : "border-slate-300 bg-white"
                                  }`}
                                >
                                  {isChecked && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin
                                    className={`w-4 h-4 shrink-0 ${isChecked ? "text-brand-blue" : "text-slate-400"}`}
                                  />
                                  <span
                                    className={`font-bold text-xs sm:text-sm ${isChecked ? "text-brand-blue" : "text-slate-700"}`}
                                  >
                                    {opt.label}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.preferredAreas && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.preferredAreas}
                          </span>
                        )}
                      </div>

                      {/* SDA Home Open Tour */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3">
                          Are you interested in having a tour of a new SDA home?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <div className="flex flex-col gap-3">
                          {tourOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                handleSelectOption(
                                  "interestedInTour",
                                  opt.value,
                                )
                              }
                              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex gap-3 items-center ${
                                formData.interestedInTour === opt.value
                                  ? "border-brand-blue bg-brand-blue/5"
                                  : "border-slate-300 hover:border-slate-400 bg-white"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                  formData.interestedInTour === opt.value
                                    ? "border-brand-blue bg-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {formData.interestedInTour === opt.value && (
                                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                                )}
                              </div>
                              <span
                                className={`text-xs sm:text-sm font-bold ${
                                  formData.interestedInTour === opt.value
                                    ? "text-brand-blue"
                                    : "text-slate-700"
                                }`}
                              >
                                {opt.label}
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.interestedInTour && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.interestedInTour}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* SECTION 4: Feedback & Additional info */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>4. Referral Origin &amp; Comments</span>
                      </h3>

                      {/* How did you hear about us */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3">
                          How did you hear about us?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {sourceOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSelectOption("source", opt)}
                              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.source === opt
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {/* Sub-input if 'Other' source selected */}
                        {formData.source === "Other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4"
                          >
                            <label
                              htmlFor="otherSource"
                              className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider"
                            >
                              Please Specify Source{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="otherSource"
                              type="text"
                              name="otherSource"
                              value={formData.otherSource}
                              onChange={handleInputChange}
                              placeholder="How did you hear about Affinity Care WA?"
                              className={`w-full px-4 py-3 rounded-xl border ${
                                errors.otherSource
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                            {errors.otherSource && (
                              <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3.5 h-3.5" />{" "}
                                {errors.otherSource}
                              </span>
                            )}
                          </motion.div>
                        )}
                        {errors.source && (
                          <span className="form-error-msg text-xs text-red-500 mt-2 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />{" "}
                            {errors.source}
                          </span>
                        )}
                      </div>

                      {/* Additional Comments */}
                      <div>
                        <label
                          htmlFor="comments"
                          className="block text-sm font-semibold text-slate-800 mb-1"
                        >
                          Additional comments
                        </label>
                        <span className="block text-xs text-slate-500 mb-3">
                          This is for our NDIS Supported Independent Living
                          (SIL) accommodation vacancies only. For career related
                          submissions, please complete our contact form.
                        </span>
                        <textarea
                          id="comments"
                          name="comments"
                          rows={4}
                          value={formData.comments}
                          onChange={handleInputChange}
                          placeholder="Provide any additional details here..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-400 focus:outline-brand-blue bg-slate-50/30 text-slate-900 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-slate-500">
                        By submitting this form, you authorize our care pathway
                        planners to contact you. Fields marked with{" "}
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
                    Enquiry Submitted!
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    Thank you,{" "}
                    <span className="font-semibold text-slate-900">
                      {formData.firstName}
                    </span>
                    . Your request for NDIS Supported Independent Living (SIL)
                    support has been successfully received. Our Participant
                    Engagement Department will review your details and connect
                    with you shortly.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                      What happens next?
                    </h4>
                    <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
                      <li>
                        A representative will email or call you within 1-2
                        business days.
                      </li>
                      <li>
                        We'll review vacant home compatibility in your preferred
                        Perth areas.
                      </li>
                      <li>
                        If requested, we will schedule a tour of one of our
                        modern SDA properties.
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      onClick={resetForm}
                      variant="secondary"
                      className="w-full sm:w-auto px-6 py-3 shadow-none border border-slate-200"
                    >
                      Submit Another Enquiry
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
      </section>
    </div>
  );
}
