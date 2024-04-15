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

export const wecomAppSchema = baseChannelSchema.extend({
  wecom_corp_id: z.string(),
  wecom_agent_id: z.string(),
  wecom_secret: z.string(),
})

export function WecomAppForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="wecom_corp_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Corp ID</FormLabel>
            <Input {...field} placeholder="Corp ID" />
            <FormDescription>Enter the Corp ID.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="wecom_agent_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent ID</FormLabel>
            <Input {...field} placeholder="Agent ID" />
            <FormDescription>Enter the Agent ID.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="wecom_secret"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Secret</FormLabel>
            <Input {...field} placeholder="Secret" />
            <FormDescription>Enter the Secret.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
