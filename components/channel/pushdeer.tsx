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

export const pushdeerSchema = baseChannelSchema.extend({
  pushdeer_token: z.string(),
})

export function PushdeerForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="pushdeer_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <Input {...field} placeholder="Token" />
            <FormDescription>Enter the Pushdeer Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
