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

export const wecomWebhookSchema = baseChannelSchema.extend({
  wecom_webhook_key: z.string(),
})

export function WecomWebhookForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="wecom_webhook_key"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key</FormLabel>
            <Input {...field} placeholder="Key" />
            <FormDescription>Enter the Wecom Webhook Key.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
