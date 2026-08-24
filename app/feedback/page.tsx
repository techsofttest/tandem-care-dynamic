import { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

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
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

/*
|--------------------------------------------------------------------------
| Fetch Feedback Banner
|--------------------------------------------------------------------------
*/

async function getFeedbackBanner(): Promise<BannerResponse> {
  return fetchData("feedback-banner");
}

/*
|--------------------------------------------------------------------------
| Fetch SEO
|--------------------------------------------------------------------------
*/

async function getSeo(): Promise<SeoResponse> {
  return fetchData("seo/feedback");
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
  const bannerResult = await getFeedbackBanner();

  return <FeedbackClient bannerData={bannerResult.data} />;
}
