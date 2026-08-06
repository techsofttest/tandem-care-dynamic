import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

interface SeoService {
  id: number;
  title: string;
  slug: string;
  meta_title: string;
  meta_desc: string;
  meta_key: string;
}

async function getService(slug: string): Promise<any> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch service");
  }

  return res.json();
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const result = await getService(slug);

  const service: SeoService = result.data;

  const description = service.meta_desc?.replace(/<[^>]+>/g, "")?.trim();

  return {
    title: service.meta_title || service.title,

    description,

    keywords: service.meta_key,

    openGraph: {
      title: service.meta_title || service.title,
      description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: service.meta_title || service.title,
      description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const result = await getService(slug);

  return <ServiceDetailClient slug={slug} initialService={result.data} />;
}
