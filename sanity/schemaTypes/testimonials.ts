import { defineType, defineField } from "sanity";

export const testimonials = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "testimonialsList",
      title: "Testimonials List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "text",
              title: "Testimonial Text",
              type: "text",
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule: any) => Rule.min(1).max(5),
            }),
          ],
        },
      ],
    }),
  ],
});
