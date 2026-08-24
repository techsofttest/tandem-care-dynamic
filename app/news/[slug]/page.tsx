import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import PageBanner from "@/components/global/PageBanner";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  banner_content: string;
  description: string;
  image: string | null;
  created_at: string;
  meta_title: string;
  meta_desc: string;
  meta_key: string;
}

interface NewsResponse {
  success: boolean;
  data: NewsItem;
}

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ------------------------------------
   Remove HTML for SEO / Banner
------------------------------------ */

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

/* ------------------------------------
   Fetch News
------------------------------------ */

async function getNews(slug: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/${slug}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const result: NewsResponse = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return null;
  }
}

/* ------------------------------------
   SEO Metadata
------------------------------------ */

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const news = await getNews(slug);

  if (!news) {
    return {
      title: "News | Tandem Care",
    };
  }

  const metaTitle =
    stripHtml(news.meta_title || "") || `${news.title} | Tandem Care`;

  const metaDescription =
    stripHtml(news.meta_desc || "") ||
    stripHtml(news.banner_content || "") ||
    stripHtml(news.description || "");

  const keywords = stripHtml(news.meta_key || "");

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || undefined,

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: news.image ? [news.image] : [],
    },
  };
}

/* ------------------------------------
   News Detail Page
------------------------------------ */

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  const bannerContent = stripHtml(news.banner_content || "");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* ------------------------------------
          Page Banner
      ------------------------------------ */}

      <PageBanner
        title={news.title}
        subtitle={bannerContent}
        breadcrumbs={[
          {
            name: "News",
            href: "/#news",
          },
          {
            name: news.title,
          },
        ]}
      />

      {/* ------------------------------------
          News Content
      ------------------------------------ */}

      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]
            [background-size:24px_24px]
            opacity-60
            pointer-events-none
          "
        />

        <div
          className="
            container
            mx-auto
            px-6
            lg:px-20
            max-w-[90rem]
            relative
            z-10
          "
        >
          {/* ------------------------------------
              Article Container
          ------------------------------------ */}

          <div className="max-w-5xl mx-auto">
            {/* ------------------------------------
                Featured Image
            ------------------------------------ */}

            {news.image && (
              <div
                className="
                  relative
                  w-full
                  h-[280px]
                  sm:h-[350px]
                  md:h-[450px]
                  lg:h-[550px]
                  rounded-3xl
                  overflow-hidden
                  bg-slate-100
                  mb-10
                "
              >
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 90vw,
                    1200px
                  "
                />
              </div>
            )}

            {/* ------------------------------------
                Date
            ------------------------------------ */}

            <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue mb-5">
              <Calendar className="w-4 h-4" />
              <span>{news.created_at}</span>
            </div>

            {/* ------------------------------------
                Title
            ------------------------------------ */}

            <h1
              className="
                text-3xl
                md:text-4xl
                lg:text-5xl
                font-heading
                font-bold
                text-slate-900
                leading-tight
                mb-8
              "
            >
              {news.title}
            </h1>

            {/* ------------------------------------
                News Description / Article Content
            ------------------------------------ */}

            <article
              className="
                prose
                prose-lg
                max-w-none

                prose-headings:font-heading
                prose-headings:text-slate-900

                prose-p:text-slate-700
                prose-p:leading-8

                prose-a:text-brand-blue

                prose-strong:text-slate-900

                prose-ul:text-slate-700
                prose-ol:text-slate-700

                prose-li:text-slate-700

                prose-img:rounded-2xl

                prose-blockquote:border-brand-blue
                prose-blockquote:text-slate-600
              "
              dangerouslySetInnerHTML={{
                __html: news.description,
              }}
            />

            {/* ------------------------------------
                Back To News
            ------------------------------------ */}

            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link
                href="/#news"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-brand-blue
                  font-bold
                  hover:gap-3
                  transition-all
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
