import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "primaryCtaText",
      title: "Primary CTA Text",
      type: "string",
    }),
    defineField({
      name: "primaryCtaPrefill",
      title: "Primary CTA Prefill Message",
      type: "text",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA Text",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaPrefill",
      title: "Secondary CTA Prefill Message",
      type: "text",
    }),
    defineField({
      name: "trustBadges",
      title: "Trust Badges",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
