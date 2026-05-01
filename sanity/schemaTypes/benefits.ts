import { defineType, defineField } from "sanity";

export const benefits = defineType({
  name: "benefits",
  title: "Benefits Section",
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
      name: "benefitsList",
      title: "Benefits List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Emoji or icon text (e.g., 💧, ✈️)",
            }),
          ],
        },
      ],
    }),
  ],
});
