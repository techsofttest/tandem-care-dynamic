import { Metadata } from "next";
import ReferralsClient from "./ReferralsClient";
import { getServices } from "@/app/lib/services";

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
}

interface BannerResponse {
  success: boolean;
  data: BannerData;
}

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
    const errorText = await res.text();

    console.error(`API Error [${endpoint}]:`, {
      status: res.status,
      statusText: res.statusText,
      response: errorText,
    });

    throw new Error(
      `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
}

/*
|--------------------------------------------------------------------------
| Fetch Referrals Banner
|--------------------------------------------------------------------------
*/

async function getReferralsBanner(): Promise<BannerResponse> {
  return fetchData("referrals-banner");
}

/*
|--------------------------------------------------------------------------
| Fetch SEO
|--------------------------------------------------------------------------
*/

async function getSeo(): Promise<SeoResponse> {
  return fetchData("seo/referrals");
}

/*
|--------------------------------------------------------------------------
| Metadata
|--------------------------------------------------------------------------
*/

export async function generateMetadata(): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error("Failed to load referrals SEO:", error);

    return {
      title: "Make a Referral",
      description: "Complete this form if you would like to use our services.",
    };
  }
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default async function Page() {
  const [bannerResult, services] = await Promise.all([
    getReferralsBanner(),
    getServices(),
  ]);

  return <ReferralsClient bannerData={bannerResult.data} services={services} />;
}
