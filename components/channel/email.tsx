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

export const emailSchema = baseChannelSchema.extend({
  email_host: z.string(),
  email_password: z.string(),
  email_port: z.string(),
  email_starttls: z.string(),
  email_to: z.string(),
  email_user: z.string(),
})

export function EmailForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="email_host"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Host</FormLabel>
            <Input {...field} placeholder="Host" />
            <FormDescription>Enter the Email Host.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <Input {...field} placeholder="Password" />
            <FormDescription>Enter the Email Password.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email_port"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Port</FormLabel>
            <Input {...field} placeholder="Port" />
            <FormDescription>Enter the Email Port.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email_starttls"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Starttls</FormLabel>
            <Input {...field} placeholder="Starttls" />
            <FormDescription>Enter the Email Starttls.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email_to"
        render={({ field }) => (
          <FormItem>
            <FormLabel>To</FormLabel>
            <Input {...field} placeholder="To" />
            <FormDescription>Enter the Email To.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email_user"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User</FormLabel>
            <Input {...field} placeholder="User" />
            <FormDescription>Enter the Email User.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
