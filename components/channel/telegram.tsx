import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { baseChannelSchema } from "./base"

export const telegramSchema = baseChannelSchema.extend({
  telegram_token: z.string(),
  telegram_chat_id: z.string(),
})

export function TelegramForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="telegram_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <Input {...field} placeholder="Token" />
            <FormDescription>Enter the Telegram Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="telegram_chat_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chat ID</FormLabel>
            <Input {...field} placeholder="Chat ID" />
            <FormDescription>Enter the Telegram Chat ID.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
