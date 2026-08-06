import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

interface Seo {
  title: string;
  meta_title: string;
  meta_desc: string;
  meta_key: string;
}

interface Banner {
  title: string;
  content: string;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

interface ApiResponse {
  success: boolean;
  seo: Seo;
  banner: Banner;
  data: Service[];
}

async function getPageData(): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-service`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Services page data");
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const result = await getPageData();

  return {
    title: result.seo.meta_title || result.seo.title,
    description: result.seo.meta_desc,
    keywords: result.seo.meta_key,

    openGraph: {
      title: result.seo.meta_title,
      description: result.seo.meta_desc,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: result.seo.meta_title,
      description: result.seo.meta_desc,
    },
  };
}

export default async function Page() {
  const result = await getPageData();

  return <ServicesPageClient initialData={result} />;
}
