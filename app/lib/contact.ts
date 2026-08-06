export interface Contact {
  id: number;
  address: string;
  // map_embed_link: string;
  email: string;
  phone: string;
  whatsapp: string;
  opening_hours: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface ContactSeo {
  id: number;
  title: string;
  meta_title: string;
  meta_desc: string;
  meta_key: string;
}

export interface ContactBanner {
  id: number;
  title: string;
  subtitle: string;
}

export interface ContactResponse {
  success: boolean;
  seo: ContactSeo;
  banner: ContactBanner;
  contact: Contact;
}

export async function getContact(): Promise<ContactResponse | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contact data");
    }

    const result: ContactResponse = await response.json();

    return result.success ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
