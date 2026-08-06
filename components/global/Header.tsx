"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown, Heart, Menu, X } from "lucide-react";
import Button from "../ui/Button";
import type { Service } from "@/app/lib/services";
import type { Contact } from "@/app/lib/contact";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z" />
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

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

interface HeaderProps {
  services?: Service[];
  contact: Contact | null;
}

export default function Header({ services = [], contact }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const socialLinks = [
    {
      icon: FacebookIcon,
      href: contact?.facebook,
      label: "Facebook",
    },
    {
      icon: InstagramIcon,
      href: contact?.instagram,
      label: "Instagram",
    },
    {
      icon: XIcon,
      href: contact?.twitter,
      label: "X",
    },
    {
      icon: WhatsappIcon,
      href: contact?.whatsapp
        ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
        : undefined,
      label: "WhatsApp",
    },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      {/* Top Utility Bar with Forward-Slanted Left Edge (\) */}
      <div className="hidden md:flex w-full h-11 justify-center bg-white relative overflow-hidden">
        {/* Background shape stretching right */}
        <div className="absolute top-0 -right-10 w-[450px] lg:w-[500px] xl:w-[600px] h-full bg-slate-50/80 -skew-x-[30deg] rounded-bl-2xl border-b border-l border-slate-100 z-0" />

        {/* Content aligned with the rest of the site */}
        <div className="container mx-auto px-4 lg:px-10 max-w-[90rem] h-full flex justify-end items-center relative z-10">
          <div className="flex items-center space-x-8 text-sm text-slate-600 font-medium">
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) =>
                href ? (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-blue transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ) : null,
              )}
            </div>

            <Link
              href="/contact"
              className="hover:text-brand-blue transition-colors"
            >
              Contact us
            </Link>
            <a
              href={`tel:${contact?.phone ?? ""}`}
              className="flex items-center hover:text-brand-blue transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              {contact?.phone ?? "N/A"}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Container */}
      <div className="container mx-auto px-4 lg:px-10 max-w-[90rem] h-20 flex items-center justify-between relative">
        {/* DESKTOP OVERLAPPING LOGOS */}
        <div className="hidden md:flex items-center absolute bottom-2 left-4 lg:left-10 z-20">
          <Link
            href="/"
            className="flex items-center gap-4 transition-transform hover:scale-105"
          >
            <div className="relative h-[90px] w-[90px]">
              <Image
                src="/logo/logo2.png"
                alt="Tandem Care Logo"
                fill
                className="object-contain"
                sizes="90px"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-2xl whitespace-nowrap">
                <span className="text-[#0a3a5c]">Tandem</span>{" "}
                <span className="text-[#38bdf8]">Care</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                Care That Feels Like Home
              </span>
            </div>
          </Link>
          <div className="relative h-18 w-18 ml-6">
            <Image
              src="/ndis-logo/i-love-ndis.png"
              alt="I Love NDIS Logo"
              fill
              className="object-contain"
              sizes="80px"
              priority
            />
          </div>
        </div>

        {/* MOBILE LOGO (Standard inline flow for small screens) */}
        <div className="md:hidden flex items-center gap-3 relative z-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-14 w-16">
              <Image
                src="/logo/logo2.png"
                alt="Tandem Care Logo"
                fill
                className="object-contain object-left"
                sizes="64px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center leading-none">
                <span className="font-bold text-lg text-brand-blue">
                  Tandem
                </span>
                <span className="font-bold text-lg text-brand-blue ml-1">
                  Care
                </span>
              </div>
              <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5 whitespace-nowrap">
                Registered NDIS Provider
              </span>
            </div>
          </Link>
          <div className="relative h-10 w-10 ml-2">
            <Image
              src="/ndis-logo/i-love-ndis.png"
              alt="I Love NDIS Logo"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation Layout: Left Spacer, Centering Nav, Right CTAs */}
        <div className="hidden nav:flex flex-1 items-center justify-between animate-fade-in">
          {/* Left spacer to push nav to the right */}
          <div className="flex-1" />

          {/* Right: Navigation Links & CTAs */}
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-5 xl:space-x-8 font-semibold text-slate-800 text-xs xl:text-sm whitespace-nowrap">
              <Link
                href="/"
                className="hover:text-brand-blue transition-colors py-6"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="hover:text-brand-blue transition-colors py-6"
              >
                About Us
              </Link>

              <div className="group cursor-pointer py-6 flex items-center hover:text-brand-blue transition-colors">
                <Link href="/services" className="flex items-center">
                  <span>NDIS Services</span>
                  <ChevronDown className="w-4 h-4 ml-1 stroke-[2.5]" />
                </Link>

                {/* NDIS Services Mega Menu */}
                <div className="absolute top-[100%] left-0 w-full hidden group-hover:block z-50 whitespace-normal before:absolute before:content-[''] before:top-[-20px] before:left-0 before:right-0 before:h-[20px]">
                  <div className="bg-white border-t border-slate-100 shadow-2xl rounded-b-3xl p-6 lg:p-8 max-h-[calc(100vh-8rem)] overflow-y-auto cursor-default">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                      {services.length === 0 ? (
                        <div className="col-span-4 text-center py-6 text-slate-500">
                          No services available.
                        </div>
                      ) : (
                        services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50/80 transition-all duration-300 border border-transparent hover:border-slate-100"
                          >
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-100">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="56px"
                                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                              />
                            </div>

                            <span className="text-sm font-bold text-slate-800 leading-snug group-hover/item:text-brand-blue transition-colors">
                              {service.title}
                            </span>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/sil-enquiry"
                className="hover:text-brand-blue transition-colors py-6"
              >
                SIL Enquiry
              </Link>

              <Link
                href="/feedback"
                className="hover:text-brand-blue transition-colors py-6"
              >
                Feedback
              </Link>
            </nav>

            <Button
              href="/contact"
              variant="secondary"
              className="px-4 py-2 text-sm rounded-full whitespace-nowrap"
            >
              General Enquiry
            </Button>
            <Button
              href="/referrals"
              variant="primary"
              className="px-5 py-2 text-sm rounded-full shadow-md shadow-indigo-600/20 whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 mr-2 fill-current" />
              Make a Referral
            </Button>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="nav:hidden flex items-center gap-2 relative z-20 ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="nav:hidden absolute top-[100%] left-0 w-full bg-white border-t border-slate-100 shadow-2xl z-50 p-6 flex flex-col space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-800 text-sm">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-blue transition-colors py-2 border-b border-slate-50"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-blue transition-colors py-2 border-b border-slate-50"
            >
              About Us
            </Link>

            {/* Mobile Dropdown for NDIS Services */}
            <div className="flex flex-col">
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="flex items-center justify-between w-full hover:text-brand-blue transition-colors py-2 border-b border-slate-50 text-left font-semibold cursor-pointer"
              >
                <span>NDIS Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isServicesDropdownOpen && (
                <div className="grid grid-cols-1 gap-2 pl-4 py-3 bg-slate-50/50 rounded-2xl mt-2 border border-slate-100">
                  {services.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No services available.
                    </p>
                  ) : (
                    services.slice(0, 8).map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs font-bold text-slate-700 hover:text-brand-blue py-1.5 block"
                      >
                        {service.title}
                      </Link>
                    ))
                  )}

                  {services.length > 8 && (
                    <Link
                      href="/services"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-bold text-brand-blue pt-2"
                    >
                      View All Services →
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/sil-enquiry"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-blue transition-colors py-2 border-b border-slate-50"
            >
              SIL Enquiry
            </Link>
            <Link
              href="/feedback"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-brand-blue transition-colors py-2 border-b border-slate-50"
            >
              Feedback
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
            <Button
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full py-3 text-sm rounded-xl justify-center"
            >
              General Enquiry
            </Button>
            <Button
              href="/referrals"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full py-3 text-sm rounded-xl justify-center bg-brand-blue text-white"
            >
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Make a Referral
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
