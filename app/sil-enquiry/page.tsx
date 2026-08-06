import { Metadata } from "next";
import SIL_EnquiryClient from "./SIL_EnquiryClient";
import { getServices } from "@/app/lib/services";

interface Seo {
  id: number;
  title: string;
  meta_title: string;
  meta_desc: string;
  meta_key: string;
}

interface SeoResponse {
  success: boolean;
  data: Seo;
}

/*
|--------------------------------------------------------------------------
| Common Fetch Function
|--------------------------------------------------------------------------
*/

async function fetchData(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

/*
|--------------------------------------------------------------------------
| Fetch SIL Enquiry Banner
|--------------------------------------------------------------------------
*/

async function getSIL_EnqBanner() {
  return fetchData("sil-enq-banner");
}

/*
|--------------------------------------------------------------------------
| Fetch SEO
|--------------------------------------------------------------------------
*/

async function getSeo(): Promise<SeoResponse> {
  return fetchData("seo/sil-enq");
}

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export async function generateMetadata(): Promise<Metadata> {
  const { data: seo } = await getSeo();

  return {
    title: seo.meta_title || seo.title,
    description: seo.meta_desc,
    keywords: seo.meta_key,

    openGraph: {
      title: seo.meta_title || seo.title,
      description: seo.meta_desc,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: seo.meta_title || seo.title,
      description: seo.meta_desc,
    },
  };
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default async function Page() {
  const [bannerResult, services] = await Promise.all([
    getSIL_EnqBanner(),
    getServices(),
  ]);

  return (
    <SIL_EnquiryClient bannerData={bannerResult.data} services={services} />
  );
}
