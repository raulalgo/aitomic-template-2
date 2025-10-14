import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  target: z.string().optional(),
  source: z.string(),
  registryDependencies: z.array(z.string()).default([]),
  // Add any other fields you need
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["stable", "beta", "alpha"]).default("stable"),
  author: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

const blockSchema = baseSchema.extend({
  type: z.literal("block"),
});

const starterSchema = baseSchema.extend({
  type: z.literal("starter"),
});

export const collections = {
  components: defineCollection({
    type: "content",
    schema: baseSchema,
  }),
  blocks: defineCollection({
    type: "content",
    schema: blockSchema,
  }),
  starters: defineCollection({
    type: "content",
    schema: starterSchema,
  }),
};
