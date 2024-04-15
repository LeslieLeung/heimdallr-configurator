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

export const chanifySchema = baseChannelSchema.extend({
  chanify_token: z.string(),
})

export function ChanifyForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="chanify_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <Input {...field} placeholder="Token" />
            <FormDescription>Enter the Chanify Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
