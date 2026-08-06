import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { getContact } from "@/app/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContact();

  if (!data) {
    return {
      title: "Contact",
    };
  }

  const { seo } = data;

  return {
    title: seo.meta_title || seo.title,
    description: seo.meta_desc || "",
    keywords: seo.meta_key || "",
    openGraph: {
      title: seo.meta_title || seo.title,
      description: seo.meta_desc || "",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.meta_title || seo.title,
      description: seo.meta_desc || "",
    },
  };
}

export default async function Page() {
  const data = await getContact();

  if (!data) {
    return <div>Failed to load contact data.</div>;
  }

  return <ContactClient bannerData={data.banner} contactData={data.contact} />;
}
