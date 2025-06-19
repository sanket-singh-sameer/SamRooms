const z = require("zod");

const listingSchema = z.object({
  listing: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().nullable().optional(),
    price: z
      .string()
      .min(1, "Price is required")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Price must be a non-negative number",
      }),
    country: z.string().min(1, "Country is required"),
    location: z.string().min(1, "Location is required"),
  }),
});

module.exports = listingSchema;
