"use client";

import { useState, FormEvent, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Check,
  AlertCircle,
  Info,
  MapPin,
  Send,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Activity,
  Car,
} from "lucide-react";
import PageBanner from "@/components/global/PageBanner";
import Button from "@/components/ui/Button";
import type { Service } from "@/app/lib/services";

/*
|--------------------------------------------------------------------------
| Banner Data
|--------------------------------------------------------------------------
*/

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
}

interface ReferralsClientProps {
  bannerData: BannerData;
  services: Service[];
}

interface FormData {
  participantName: string;
  dobOrAge: string;
  gender: string;
  location: string;
  disabilityType: string;
  medicalCondition: string;
  email: string;
  phone: string;
  role: string;
  referredPerson: string;
  hasNdisPlan: string;
  servicesNeeded: string[];
  wheelchairVehicleRequired: string;
  sdaCategory: string;
  source: string;
  otherSource: string;
  comments: string;
}

const INITIAL_FORM_STATE: FormData = {
  participantName: "",
  dobOrAge: "",
  gender: "",
  location: "",
  disabilityType: "",
  medicalCondition: "",
  email: "",
  phone: "",
  role: "",
  referredPerson: "",
  hasNdisPlan: "",
  servicesNeeded: [],
  wheelchairVehicleRequired: "",
  sdaCategory: "",
  source: "",
  otherSource: "",
  comments: "",
};

function ReferralsPageContent({ bannerData, services }: ReferralsClientProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    const serviceParam = searchParams.get("service");

    if (roleParam || serviceParam) {
      setFormData((prev) => {
        const updated = { ...prev };
        if (roleParam) {
          updated.role = roleParam;
          // Auto-select referredPerson based on role
          if (roleParam === "Person with disability") {
            updated.referredPerson = "Myself";
          } else if (roleParam === "Family member") {
            updated.referredPerson = "My relative";
          } else if (roleParam === "Support Coordinator") {
            updated.referredPerson = "A client / participant";
          }
        }

        // Preselect service using service ID
        if (serviceParam) {
          const selectedService = services.find(
            (service) => service.id.toString() === serviceParam,
          );

          if (selectedService) {
            updated.servicesNeeded = [selectedService.id.toString()];
          }
        }

        return updated;
      });
    }
  }, [searchParams]);

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

  const sdaCategoryOptions = [
    "Improved Liveability",
    "Robust",
    "Fully Accessible",
    "High Physical Support",
  ];

  const wheelchairOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const sourceOptions = [
    "Social Media",
    "Google",
    "Support Coordinator/Plan Manager",
    "Word of Mouth",
    "Email from The Star Care Group",
    "Post/Mail",
    "Events/Expo",
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

  const handleCheckboxToggle = (field: "servicesNeeded", value: string) => {
    setFormData((prev) => {
      const currentList = prev[field] as string[];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      if (errors[field]) {
        setErrors((e) => ({ ...e, [field]: "" }));
      }

      return { ...prev, [field]: newList };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.participantName.trim())
      newErrors.participantName = "Participant name is required";
    if (!formData.dobOrAge.trim())
      newErrors.dobOrAge = "Participant date of birth or age is required";
    if (!formData.gender.trim())
      newErrors.gender = "Participant gender is required";
    if (!formData.location.trim())
      newErrors.location = "Participant location/suburb is required";
    if (!formData.disabilityType.trim())
      newErrors.disabilityType = "Disability type is required";
    if (!formData.medicalCondition.trim())
      newErrors.medicalCondition = "Medical condition is required";

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
      newErrors.hasNdisPlan = "Please select NDIS plan status";
    if (formData.servicesNeeded.length === 0)
      newErrors.servicesNeeded = "Please select at least one service option";
    if (!formData.source)
      newErrors.source = "Please select how you heard about us";
    if (formData.source === "Other" && !formData.otherSource.trim()) {
      newErrors.otherSource = "Please specify how you heard about us";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate after logging
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
        `${process.env.NEXT_PUBLIC_API_URL}/referral`,
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
          const apiErrors: Partial<Record<keyof FormData, string>> = {};

          Object.entries(result.errors).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              apiErrors[key as keyof FormData] = value[0] as string;
            }
          });

          setErrors(apiErrors);
        }

        throw new Error(result.message || "Failed to submit referral.");
      }

      setIsSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the referral.",
      );
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
                  key="referral-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 md:p-12"
                >
                  {/* Introduction Details */}
                  <div className="mb-10 pb-8 border-b border-slate-100">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4">
                      Referral Form
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Complete this form if you would like to use The Star Care
                      Group’s services. Our Services Management Team will review
                      your requirements and respond shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 p-5 bg-brand-blue/5 rounded-2xl border border-brand-blue/15 text-slate-700 text-sm">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800">
                            For more information, contact our Services
                            Management Team on:
                          </span>
                          <div className="mt-2 flex flex-col sm:flex-row sm:gap-6">
                            <span>
                              <strong>Ph.N/A</strong>{" "}
                              <a
                                href="tel:"
                                className="text-brand-blue font-semibold hover:underline"
                              ></a>
                            </span>
                            <span>
                              <strong>Email:</strong>{" "}
                              <a
                                href="mailto:info@tandemcare.com.au"
                                className="text-brand-blue font-semibold hover:underline"
                              >
                                info@tandemcare.com.au
                              </a>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-10"
                    noValidate
                  >
                    {/* SECTION 1: Participant Information */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>1. Participant Information</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Participant Name */}
                        <div>
                          <label
                            htmlFor="participantName"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Participant Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="participantName"
                              type="text"
                              name="participantName"
                              value={formData.participantName}
                              onChange={handleInputChange}
                              placeholder="Full Name"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.participantName
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.participantName && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.participantName}
                            </span>
                          )}
                        </div>

                        {/* DOB / Age */}
                        <div>
                          <label
                            htmlFor="dobOrAge"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Participant's Date of Birth or Age{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="dobOrAge"
                              type="text"
                              name="dobOrAge"
                              value={formData.dobOrAge}
                              onChange={handleInputChange}
                              placeholder="DD/MM/YYYY or Age"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.dobOrAge
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.dobOrAge && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.dobOrAge}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Gender */}
                        <div>
                          <label
                            htmlFor="gender"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Participant Gender{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="gender"
                              type="text"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              placeholder="e.g. Male, Female, Non-binary"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.gender
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.gender && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.gender}
                            </span>
                          )}
                        </div>

                        {/* Location / Suburb */}
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Participant's Suburb/Location{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="location"
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              placeholder="Suburb / Location"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.location
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.location && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Disability Type */}
                        <div>
                          <label
                            htmlFor="disabilityType"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Disability Type{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Activity className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="disabilityType"
                              type="text"
                              name="disabilityType"
                              value={formData.disabilityType}
                              onChange={handleInputChange}
                              placeholder="Disability Type"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.disabilityType
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.disabilityType && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.disabilityType}
                            </span>
                          )}
                        </div>

                        {/* Medical Condition */}
                        <div>
                          <label
                            htmlFor="medicalCondition"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Medical Condition{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Stethoscope className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="medicalCondition"
                              type="text"
                              name="medicalCondition"
                              value={formData.medicalCondition}
                              onChange={handleInputChange}
                              placeholder="Medical Condition"
                              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                                errors.medicalCondition
                                  ? "border-red-400 focus:outline-red-400"
                                  : "border-slate-400 focus:outline-brand-blue"
                              } bg-slate-50/30 text-slate-900 transition-colors`}
                            />
                          </div>
                          {errors.medicalCondition && (
                            <span className="form-error-msg text-xs text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3.5 h-3.5" />{" "}
                              {errors.medicalCondition}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Contact Details */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>2. Contact Information</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-slate-800 mb-2"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                            <input
                              id="email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="name@email.com"
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

                        {/* Phone Number */}
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

                      {/* I am a... */}
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
                    </div>

                    {/* SECTION 3: Funding & NDIS Plan */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>3. NDIS Plan Information</span>
                      </h3>

                      {/* Do you have NDIS plan */}
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
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.hasNdisPlan}
                          </span>
                        )}
                      </div>

                      {/* SDA Approved Category */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-1">
                          If you require SDA, select your NDIS-approved
                          accommodation category.
                        </span>

                        <span className="block text-xs text-slate-500 mb-3">
                          Leave blank if you do not require Specialist
                          Disability Accommodation.
                        </span>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {sdaCategoryOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                handleSelectOption("sdaCategory", opt)
                              }
                              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.sdaCategory === opt
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: Service Choices */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>4. Service Choices</span>
                      </h3>

                      {/* What services are you looking for? */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-1">
                          What services are you looking for?{" "}
                          <span className="text-red-500">*</span>
                        </span>
                        <span className="block text-xs text-slate-500 mb-4">
                          You can choose multiple options.
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
                                {/* Checkbox */}
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

                                {/* Service Details */}
                                <div>
                                  <span
                                    className={`block font-bold text-sm md:text-base ${
                                      isChecked
                                        ? "text-brand-blue"
                                        : "text-slate-800"
                                    }`}
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
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.servicesNeeded}
                          </span>
                        )}
                      </div>

                      {/* Wheelchair accessible vehicle */}
                      <div>
                        <span className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <Car className="w-4 h-4 text-slate-400" />
                          <span>
                            Is a wheelchair accessible vehicle required for
                            community outings?
                          </span>
                        </span>
                        <div className="grid grid-cols-2 max-w-xs gap-3">
                          {wheelchairOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                handleSelectOption(
                                  "wheelchairVehicleRequired",
                                  opt.value,
                                )
                              }
                              className={`px-4 py-3 rounded-xl text-sm font-medium border text-center transition-all duration-200 cursor-pointer ${
                                formData.wheelchairVehicleRequired === opt.value
                                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                                  : "border-slate-300 hover:border-slate-400 text-slate-600 bg-white"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 5: Origin & Comments */}
                    <div className="space-y-6 pt-4 border-t border-slate-100">
                      <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                        <span>
                          5. Referral Origin &amp; Additional Information
                        </span>
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
                              placeholder="How did you hear about us?"
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

                      {/* Additional Info / Comments */}
                      <div>
                        <label
                          htmlFor="comments"
                          className="block text-sm font-semibold text-slate-800 mb-1"
                        >
                          Other Information
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          rows={4}
                          value={formData.comments}
                          onChange={handleInputChange}
                          placeholder="Any additional information..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-400 focus:outline-brand-blue bg-slate-50/30 text-slate-900 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-slate-500">
                        By submitting this form, you authorize our Services
                        Management Team to contact you. Fields marked with{" "}
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
                    Referral Submitted!
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    Thank you. Your referral has been successfully received. Our
                    Services Management Team will review the participant details
                    and connect with you shortly.
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
                        We'll evaluate service availability matching the
                        specific participant goals.
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      onClick={resetForm}
                      variant="secondary"
                      className="w-full sm:w-auto px-6 py-3 shadow-none border border-slate-200"
                    >
                      Submit Another Referral
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

export default function ReferralsPage({
  bannerData,
  services,
}: ReferralsClientProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <p className="text-slate-500 font-medium">Loading Referral Form...</p>
        </div>
      }
    >
      <ReferralsPageContent bannerData={bannerData} services={services} />
    </Suspense>
  );
}
