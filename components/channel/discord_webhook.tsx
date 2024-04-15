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

export const discordWebhookSchema = baseChannelSchema.extend({
  discord_webhook_id: z.string(),
  discord_webhook_token: z.string(),
})

export function DiscordWebhookForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="discord_webhook_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Webhook ID</FormLabel>
            <Input {...field} placeholder="Webhook ID" />
            <FormDescription>Enter the Discord Webhook ID.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="discord_webhook_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Webhook Token</FormLabel>
            <Input {...field} placeholder="Webhook Token" />
            <FormDescription>Enter the Discord Webhook Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
