import zod from "zod";

export const validator = zod.object({
  name: zod.string({
    required_error: "Name is required",
  }),
  email: zod
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must contain atleast 8 characters"),
});

export type TokenPayload = { id: string; email: string };

export type Validator = zod.infer<typeof validator>;
