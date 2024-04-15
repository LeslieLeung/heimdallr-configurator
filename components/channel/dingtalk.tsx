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

export const dingtalkSchema = baseChannelSchema.extend({
  dingtalk_token: z.string(),
  dingtalk_safe_words: z.string(),
})

export function DingtalkForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="dingtalk_token"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token</FormLabel>
            <Input {...field} placeholder="Token" />
            <FormDescription>Enter the Dingtalk Token.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="dingtalk_safe_words"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Safe Words</FormLabel>
            <Input {...field} placeholder="Safe Words" />
            <FormDescription>Enter the Dingtalk Safe Words.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
