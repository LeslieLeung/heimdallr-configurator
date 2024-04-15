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

export const ntfySchema = baseChannelSchema.extend({
  ntfy_host: z.string(),
  ntfy_topic: z.string(),
})

export const NtfyForm = ({ control }: { control: any }) => {
  return (
    <>
      <FormField
        control={control}
        name="ntfy_host"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Host</FormLabel>
            <Input {...field} placeholder="Host" />
            <FormDescription>Enter the Ntfy Host.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="ntfy_topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Topic</FormLabel>
            <Input {...field} placeholder="Topic" />
            <FormDescription>Enter the Ntfy Topic.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
