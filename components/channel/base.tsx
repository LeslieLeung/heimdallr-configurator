import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { CHANNELS } from "./const"

export const baseChannelSchema = z.object({
  id: z.number(),
  type: z.string(),
  name: z.string(),
  enabled: z.boolean(),
})

export function BaseChannelForm({ control }: { control: any }) {
  return (
    <>
      <FormField
        control={control}
        name="id"
        render={({ field }) => {
          return (
            <input
              type="hidden"
              {...field}
              value={field.value ?? Math.floor(Math.random() * 1000)}
            />
          )
        }}
      ></FormField>
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of channel" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(CHANNELS).map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Type of the notification channel.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <Input {...field} placeholder="Channel Name" />
            <FormDescription>Channel name used in groups.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="enabled"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block mb-2">Enabled</FormLabel>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
            <FormDescription>Check if the channel is enabled.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
