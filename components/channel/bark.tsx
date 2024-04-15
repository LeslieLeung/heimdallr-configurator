import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { baseChannelSchema } from "./base"

export const barkSchema = baseChannelSchema.extend({
  bark_url: z.string(),
  bark_key: z.string(),
})

export function BarkForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="bark_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <Input {...field} placeholder="URL" />
            <FormDescription>Enter the Bark URL.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="bark_key"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key</FormLabel>
            <Input {...field} placeholder="Key" />
            <FormDescription>Enter the Bark Key.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
