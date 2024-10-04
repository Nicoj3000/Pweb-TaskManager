import { count } from "console";
import { Phone } from "lucide-react";
import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
});