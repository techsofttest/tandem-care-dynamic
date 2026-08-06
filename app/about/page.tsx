import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

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
| Fetch About Us Banner
|--------------------------------------------------------------------------
*/

async function getAboutBanner() {
  return fetchData("about-banner");
}

/*
|--------------------------------------------------------------------------
| Fetch About Us Story
|--------------------------------------------------------------------------
*/

async function getAboutOurStory() {
  return fetchData("who-we-are");
}

/*
|--------------------------------------------------------------------------
| Fetch About Us Our Philosophy
|--------------------------------------------------------------------------
*/

async function getAboutOurPhilosophy() {
  return fetchData("our-philosophy");
}

/*
|--------------------------------------------------------------------------
| Fetch About Us Why Choose Us
|--------------------------------------------------------------------------
*/

async function getAboutwhyChooseUs() {
  return fetchData("why-choose-us");
}

/*
|--------------------------------------------------------------------------
| Fetch SEO
|--------------------------------------------------------------------------
*/

async function getSeo(): Promise<SeoResponse> {
  return fetchData("seo/about-us");
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
  const [bannerResult, whoWeAreResult, philosophyResult, whyChooseUsResult] =
    await Promise.all([
      getAboutBanner(),
      getAboutOurStory(),
      getAboutOurPhilosophy(),
      getAboutwhyChooseUs(),
    ]);

  return (
    <AboutUsClient
      bannerData={bannerResult.data}
      whoWeAreData={whoWeAreResult.data}
      philosophyData={philosophyResult.data}
      whyChooseUsData={whyChooseUsResult.data}
    />
  );
}
