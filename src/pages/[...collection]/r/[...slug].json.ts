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

  //   const response = {
  //     collection,
  //     slug,
  //     data: item.data,
  //     id: item.id,
  //   };
  const sourcePath = join(process.cwd(), item.data.source);
  let sourceContent: string;

  try {
    sourceContent = readFileSync(sourcePath, "utf-8");
  } catch (error) {
    return new Response(JSON.stringify({ error: "Source file not found" }), {
      status: 404,
    });
  }

  const response = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: slug,
    title: item.data.title,
    description: item.data.description,
    type: item.data.type,
    ...(item.data.author && {
      author: item.data.author,
    }),
    ...(item.data.dependencies && {
      dependencies: item.data.dependencies,
    }),
    ...(item.data.devDependencies && {
      devDependencies: item.data.devDependencies,
    }),
    ...(item.data.registryDependencies && {
      registryDependencies: item.data.registryDependencies,
    }),
    files: [
      {
        path: `/${item.data.source}`,
        content: sourceContent,
        type: item.data.type,
        target: item.data.target,
      },
    ],
    ...(item.data.categories && {
      categories: item.data.categories,
    }),
  };

  return new Response(JSON.stringify({ response }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/*

const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: slug,
    title: registryItem.data.title,
    description: registryItem.data.description,
    type: registryItem.data.type,
    ...(registryItem.data.author && {
      author: registryItem.data.author,
    }),
    ...(registryItem.data.dependencies && {
      dependencies: registryItem.data.dependencies,
    }),
    ...(registryItem.data.devDependencies && {
      devDependencies: registryItem.data.devDependencies,
    }),
    ...(registryItem.data.registryDependencies && {
      registryDependencies: registryItem.data.registryDependencies,
    }),
    files: [
      {
        path: `/${registryItem.data.source}`,
        content: sourceContent,
        type: registryItem.data.type,
        target: registryItem.data.target,
      },
    ],
    ...(registryItem.data.categories && {
      categories: registryItem.data.categories,
    }),
  };

  */
