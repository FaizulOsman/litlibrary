import { z } from 'zod';

// Define the Zod schema for update
const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  update,
};
