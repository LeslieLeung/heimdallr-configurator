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

export const pushoverSchema = baseChannelSchema.extend({
  pushover_user: z.string(),
  pushover_token: z.string(),
})

export function PushoverForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="pushover_user"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User</FormLabel>
            <Input {...field} placeholder="User" />
            <FormDescription>Enter the Pushover User.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="pushover_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <Input {...field} placeholder="Token" />
            <FormDescription>Enter the Pushover Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
