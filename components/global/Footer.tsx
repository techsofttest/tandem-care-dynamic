"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Service } from "@/app/lib/services";
import type { Contact } from "@/app/lib/contact";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.181L18.901 1.153zM16.91 20.644h2.039L6.486 3.24H4.298l12.612 17.404z" />
  </svg>
);

const Whatsapp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.031 0C5.395 0 .005 5.385.002 12.022a11.95 11.95 0 0 0 1.602 6.002L.001 24l6.11-1.602a11.956 11.956 0 0 0 5.92 1.572h.004c6.634 0 12.024-5.39 12.028-12.028A11.981 11.981 0 0 0 20.536 3.52 11.984 11.984 0 0 0 12.03.001zM12.03 21.968h-.003a9.957 9.957 0 0 1-5.071-1.385l-.364-.216-3.771.987 1.006-3.676-.237-.377A9.97 9.97 0 0 1 2.012 12.02C2.015 6.505 6.505 2.01 12.035 2.01a9.96 9.96 0 0 1 7.07 2.923 9.95 9.95 0 0 1 2.922 7.087c-.004 5.515-4.496 10.01-10.026 10.01zM17.518 14.471c-.301-.151-1.776-.877-2.051-.978-.275-.1-.476-.151-.676.151-.2.301-.776.978-.951 1.178-.175.201-.351.226-.652.076a8.212 8.212 0 0 1-2.417-1.492 9.07 9.07 0 0 1-1.673-2.078c-.175-.301-.019-.464.132-.614.136-.135.301-.352.451-.527.151-.176.2-.301.301-.502.101-.201.051-.376-.025-.527-.076-.151-.676-1.628-.926-2.23-.243-.588-.491-.508-.676-.517h-.576c-.2 0-.526.075-.801.376-.275.301-1.051 1.028-1.051 2.508 0 1.48 1.077 2.91 1.227 3.111.151.201 2.119 3.232 5.132 4.536.717.31 1.277.494 1.712.632.721.23 1.376.197 1.892.12.583-.087 1.776-.726 2.027-1.428.251-.702.251-1.304.176-1.429-.076-.125-.276-.201-.577-.352z" />
  </svg>
);

interface FooterProps {
  services: Service[];
  contact: Contact | null;
}

export default function Footer({ services, contact }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Participant");

  const [selectedService, setSelectedService] = useState(
    services[0]?.title ?? "General Enquiries",
  );

  const socialLinks = [
    {
      href: contact?.facebook,
      Icon: Facebook,
      label: "Facebook",
    },
    {
      href: contact?.instagram,
      Icon: Instagram,
      label: "Instagram",
    },
    {
      href: contact?.twitter,
      Icon: XIcon,
      label: "X (Twitter)",
    },
    {
      href: contact?.whatsapp
        ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
        : undefined,
      Icon: Whatsapp,
      label: "WhatsApp",
    },
  ].filter((item) => item.href);

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedService === "General Enquiries") {
      router.push("/contact");
      return;
    }

    const roleMap: Record<string, string> = {
      Participant: "Person with disability",
      "Support Coordinator": "Support Coordinator",
      "Family Member": "Family member",
    };

    const selected = services.find(
      (service) => service.title === selectedService,
    );

    const rVal = encodeURIComponent(roleMap[selectedRole] ?? "Other");
    const sVal = encodeURIComponent(selected?.title ?? "");

    router.push(`/referrals?role=${rVal}&service=${sVal}`);
  };

  return (
    <footer className="relative bg-[#003366] text-white pt-16 pb-10 overflow-hidden">
      {/* Background Pattern & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004080] to-[#001a33] pointer-events-none z-0" />
      <motion.div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.15] pointer-events-none z-0"
        animate={{ backgroundPosition: ["0px 0px", "400px 400px"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-6 lg:px-20 max-w-[90rem] relative z-10">
        {/* Top Section: Branding, Contact & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative h-16 w-48">
              <Image
                src="/logo/logo2.png"
                alt="Tandem Care Logo"
                fill
                sizes="192px"
                className="object-contain object-left brightness-0 invert opacity-90"
              />
            </div>
            <div className="space-y-4">
              <a
                href={`tel:${contact?.phone ?? ""}`}
                className="flex items-center gap-3 hover:text-[#FCB040] transition-colors"
              >
                <Phone className="w-5 h-5" />
                {contact?.phone ?? "N/A"}
              </a>
              <a
                href={`mailto:${contact?.email ?? ""}`}
                className="flex items-center gap-3 hover:text-[#FCB040] transition-colors"
              >
                <Mail className="w-5 h-5" />
                {contact?.email ?? "N/A"}
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-[#003366] transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h5 className="font-bold uppercase tracking-wider text-sm mb-4">
                Support & Services
              </h5>

              {services.length > 0 ? (
                <>
                  {services.slice(0, 4).map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block hover:underline text-gray-300"
                    >
                      {service.title}
                    </Link>
                  ))}

                  <Link
                    href="/services"
                    className="block hover:underline text-brand-orange font-bold mt-2"
                  >
                    View All Services
                  </Link>
                </>
              ) : (
                <p className="text-gray-400 text-sm">No services available</p>
              )}
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h5 className="font-bold uppercase tracking-wider text-sm mb-4">
                Company
              </h5>
              <Link
                href="/about"
                className="block hover:underline text-gray-300"
              >
                About Us
              </Link>
              {/* <Link href="#" className="block hover:underline text-gray-300">Careers</Link> */}
              <Link
                href="/contact"
                className="block hover:underline text-gray-300"
              >
                Contact Us
              </Link>
              <Link href="#" className="block hover:underline text-gray-300">
                Feedback
              </Link>
            </div>
            {/* Secondary Actions */}
            <div className="space-y-4">
              <Link href="#" className="block hover:underline text-gray-300">
                Support Us
              </Link>
              <Link href="#" className="block hover:underline text-gray-300">
                Become a Partner
              </Link>
              <Link href="#" className="block hover:underline text-gray-300">
                Tandem Care Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Routing Form */}
        <form
          onSubmit={handleFooterSubmit}
          className="bg-white/5 backdrop-blur-md p-6 lg:p-8 rounded-3xl shadow-2xl shadow-black/20 border border-white/10 flex flex-col md:flex-row items-center gap-6 mb-16 w-full text-left"
        >
          <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-4">
            {/* User Type Selector */}
            <div className="flex flex-col w-full">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1 mb-1.5">
                I am a
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-orange appearance-none font-medium cursor-pointer transition-colors hover:bg-white/10"
              >
                <option className="bg-[#003366] text-white">Participant</option>
                <option className="bg-[#003366] text-white">
                  Support Coordinator
                </option>
                <option className="bg-[#003366] text-white">
                  Family Member
                </option>
              </select>
            </div>

            {/* Visual Divider (Hidden on Mobile) */}
            <div className="hidden sm:block text-white/20 font-light text-4xl mb-[-24px] mx-2">
              /
            </div>

            {/* Service Selector */}
            <div className="flex flex-col w-full">
              <label className="text-xs font-bold text-white/60 uppercase tracking-wider ml-1 mb-1.5">
                Looking for
              </label>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-orange appearance-none font-medium cursor-pointer transition-colors hover:bg-white/10"
              >
                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.title}
                    className="bg-[#003366] text-white"
                  >
                    {service.title}
                  </option>
                ))}

                <option
                  value="General Enquiries"
                  className="bg-[#003366] text-white"
                >
                  General Enquiries
                </option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-auto mt-2 md:mt-6">
            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto px-8 py-3.5 rounded-xl text-lg group"
            >
              Go
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>

        {/* Compliance & Legal Block */}
        <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-white/20">
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-2">
              <div className="w-12 h-8 bg-black/30 rounded" />{" "}
              {/* Placeholder for Aboriginal Flag icon */}
              <div className="w-12 h-8 bg-blue-700/30 rounded" />{" "}
              {/* Placeholder for TSI Flag */}
            </div>
            <p className="text-xs leading-relaxed opacity-70">
              Tandem Care acknowledges the Traditional Custodians of the lands
              upon which we live and work. We pay our respects to their Elders
              past, present, and emerging. We celebrate the stories, culture,
              and traditions of Aboriginal and Torres Strait Islander Elders.
            </p>
          </div>
          <div className="text-xs opacity-70 leading-relaxed text-left">
            Tandem Care is a registered provider under the National Disability
            Insurance Scheme (NDIS).
            <br />
            {contact?.address ??
              "Level 1, 123 Example St, Melbourne, VIC 3000 Australia."}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs opacity-60 flex justify-center items-center gap-4">
          <p>&copy; {currentYear} Tandem Care. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Privacy Policy</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
