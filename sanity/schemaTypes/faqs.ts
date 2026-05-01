import { defineType, defineField } from "sanity";

export const faqs = defineType({
  name: "faqs",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "faqList",
      title: "FAQ List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
            }),
          ],
        },
      ],
    }),
  ],
});
