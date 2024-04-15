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

export const appriseSchema = baseChannelSchema.extend({
  apprise_url: z.string(),
})

export function AppriseForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="apprise_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <Input {...field} placeholder="URL" />
            <FormDescription>Enter the Apprise URL.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
