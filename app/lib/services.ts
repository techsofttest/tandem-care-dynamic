export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/home-service`,
      {
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
