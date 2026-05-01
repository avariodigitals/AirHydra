import { defineType, defineField } from "sanity";

export const howItWorks = defineType({
  name: "howItWorks",
  title: "How It Works Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "step",
              title: "Step Number",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
  ],
});
