
import { z } from "zod";

const concernSchema = z.object({
    title: z.string().min(3, "Title is required.").trim(),
    description: z.string().min(10, "Description is required.").trim(),
    patientId: z.string().min(1, "Patient ID is required.").trim(),
    doctorId: z.string().min(1, "Doctor ID is required.").trim(),
    status: z.enum(["ACTIVE", "CLOSED"]),
    createdAt: z.date(),
    updatedAt: z.date(),
    resolvedAt: z.date().optional(),
    resolvedBy: z.string().optional(),
    doctorSignature: z.string().optional(),
    patientSignature: z.string().optional(),
    concernType: z.enum(["GENERAL", "MEDICAL"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    isUrgent: z.boolean().optional(),
});