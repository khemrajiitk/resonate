import { z } from "zod";
import { ObjectId } from "bson"; // BSON Parser

// Define a helper function to validate MongoDB ObjectId
export const objectIdSchema = z.string().refine(value => ObjectId.isValid(value), {
    message: "Invalid MongoDB ObjectId",
});

/**
 * ✅ Name Validation: Required, max 100 characters
 */
export const nameSchema = z.string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name is too long" });

/**
 * ✅ Email Validation: Must be a valid email
 */
export const emailSchema = z.string()
    .email({ message: "Invalid email format" });

/**
 * ✅ Phone Validation: Optional, must follow E.164 format
 */
export const phoneSchema = z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" })
    .optional();

export const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")


// ✅ Schema to validate `id` from req.params
export const paramsWithIdSchema = z.object({
    id: objectIdSchema, // Ensures valid MongoDB ObjectId
});

// ✅ Define an Enum for Request Source (Ensures Type Safety)
export enum ValidationSource {
    BODY = "body",
    QUERY = "query",
    PARAMS = "params",
}