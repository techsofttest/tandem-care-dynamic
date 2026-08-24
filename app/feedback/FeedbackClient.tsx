"use client";

import PageBanner from "@/components/global/PageBanner";
import FeedbackForm from "@/components/global/FeedbackForm";
import { ShieldCheck, HeartHandshake } from "lucide-react";

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
}

interface FeedbackClientProps {
  bannerData: BannerData;
}

export default function FeedbackClient({ bannerData }: FeedbackClientProps) {
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
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
                  We Value Your Feedback
                </h2>

                <p className="text-slate-600 leading-relaxed">
                  Your compliments, suggestions, and concerns help us shape a
                  higher standard of care. Let us know how we can support you
                  better.
                </p>
              </div>

              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-3xl hover:border-brand-blue/30 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      Safe & Confidential
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your input is confidential. Feel free to leave contact
                      fields empty if you wish to remain completely anonymous.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-3xl hover:border-brand-blue/30 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      Continuous Improvement
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every piece of feedback is reviewed directly by our
                      management team to ensure action is taken where necessary.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
