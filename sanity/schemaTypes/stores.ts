import { defineType, defineField } from "sanity";

export const stores = defineType({
  name: "stores",
  title: "Stores",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "storesList",
      title: "Stores List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Store Name",
              type: "string",
            }),
            defineField({
              name: "address",
              title: "Address",
              type: "text",
            }),
            defineField({
              name: "city",
              title: "City",
              type: "string",
            }),
            defineField({
              name: "googleMapsLink",
              title: "Google Maps Link",
              type: "url",
            }),
            defineField({
              name: "contactNumber",
              title: "Contact Number",
              type: "string",
            }),
            defineField({
              name: "isAvailable",
              title: "Availability Status",
              type: "boolean",
              initialValue: true,
            }),
          ],
        },
      ],
    }),
  ],
});
