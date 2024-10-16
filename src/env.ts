import dotenv from "dotenv"
import { object, optional, string } from "valibot";
import { mustParse } from "./util/validation";

const { error } = dotenv.config({ override: true })
if (error)
    throw error;

const envSchema = object({
    PREFIX: string(),
    BOT_KEY: optional(string()),
    BOT_NAME: optional(string())
})

const parsed = mustParse("Invalid env variables", envSchema, process.env)

export const {
    PREFIX,
    BOT_KEY,
    BOT_NAME
} = parsed