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

export const larkSchema = baseChannelSchema.extend({
  lark_token: z.string(),
})

export function LarkForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="lark_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <Input {...field} placeholder="Token" />
            <FormDescription>Enter the Lark Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
