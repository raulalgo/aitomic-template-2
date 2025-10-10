import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { join } from "path";
import { readFileSync } from "fs";

export async function getStaticPaths() {
  const collections = ["components", "blocks", "starters"] as const;
  const paths = await Promise.all(
    collections.map(async (collection) => {
      const items = await getCollection(collection);
      return items.map((item) => ({
        params: { collection, slug: item.slug },
        props: {
          item,
          collection,
        },
      }));
    })
  );
  return paths.flat();
}

export const GET: APIRoute = async ({ params, props }) => {
  const { collection, slug } = params;
  const { item } = props;

  const response = {
    collection,
    slug,
    data: item.data,
    id: item.id,
  };
  const sourcePath = join(process.cwd(), response.data.source);
  let sourceContent: string;

  try {
    sourceContent = readFileSync(sourcePath, "utf-8");
  } catch (error) {
    return new Response(JSON.stringify({ error: "Source file not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ response, source: sourceContent }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
