import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "International format (e.g., 2347072387362)",
    }),
    defineField({
      name: "stickyCtaText",
      title: "Sticky CTA Text",
      type: "string",
    }),
    defineField({
      name: "stickyCtaPrefill",
      title: "Sticky CTA Prefill Message",
      type: "text",
    }),
    defineField({
      name: "finalCtaHeadline",
      title: "Final CTA Headline",
      type: "string",
    }),
    defineField({
      name: "finalCtaDescription",
      title: "Final CTA Description",
      type: "text",
    }),
    defineField({
      name: "finalCtaText",
      title: "Final CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "finalCtaPrefill",
      title: "Final CTA Prefill Message",
      type: "text",
    }),
  ],
});
