import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import MultipleSelector from "@/components/ui/multiple-selector"
import { Option } from "@/components/ui/multiple-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { CACHE } from "@/app/constants"
import { baseChannelSchema } from "../channel/base"

const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
})

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  token: z.string(),
  enabled_channels: z.array(optionSchema),
})

export function GroupForm({
  group,
  onFormChange,
}: {
  group: any
  onFormChange: any
}) {
  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: async (data) => {
      try {
        groupSchema.parse(data)
        return {
          values: data,
          errors: {},
        }
      } catch (error) {
        return {
          values: {},
          errors: {},
        }
      }
    },
    defaultValues: group,
  })

  const { watch, control } = form
  const watchAllFields = watch()

  const prevWatchAllFields = usePrevious(watchAllFields)

  const deleteGroup = () => {
    const confString = localStorage.getItem(CACHE.GROUPS)
    if (confString === null) {
      return
    }

    const conf = JSON.parse(confString)
    const newConf = []
    for (let i = 0; i < conf.length; i++) {
      if (conf[i].id !== group.id) {
        newConf.push(conf[i])
      }
    }
    localStorage.setItem(CACHE.GROUPS, JSON.stringify(newConf))
  }

  type BaseChannel = z.infer<typeof baseChannelSchema>

  const [enabledChannelsList, setEnabledChannelsList] = useState<BaseChannel[]>(
    []
  )

  useEffect(() => {
    const channels = localStorage.getItem(CACHE.CHANNELS)
    if (channels) {
      const parsedChannels = JSON.parse(channels) as BaseChannel[]
      const enabledChannels = parsedChannels.filter(
        (channel) => channel.enabled
      )
      setEnabledChannelsList(enabledChannels)
    }
  }, [])

  useEffect(() => {
    if (JSON.stringify(watchAllFields) !== JSON.stringify(prevWatchAllFields)) {
      onFormChange(watchAllFields)
    }
  }, [watchAllFields, prevWatchAllFields, onFormChange])

  return (
    <>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={control}
            name="id"
            render={({ field }) => (
              <input
                type="hidden"
                {...field}
                value={field.value ?? Math.floor(Math.random() * 1000)}
              />
            )}
          ></FormField>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder="Name" />
                <FormDescription>Enter the group name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <Input {...field} placeholder="Token" />
                <FormDescription>Enter the group token.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="enabled_channels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enabled Channels</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    hidePlaceholderWhenSelected
                    placeholder="Select channels"
                    options={enabledChannelsList.map(
                      (channel) =>
                        ({
                          value: channel.name,
                          label: channel.name,
                        } as Option)
                    )}
                  />
                </FormControl>
                <FormDescription>
                  <p>Select the channels for group.</p>
                  <p>
                    Notice: You may need to manually remove them after disabled
                    in the channel tab.
                  </p>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="destructive" onClick={deleteGroup}>
            Delete Channel
          </Button>
        </form>
      </Form>
    </>
  )
}

// Custom hook to get the previous value of a variable
function usePrevious(
  value:
    | { id: number; name: string; token: string; enabled_channels: {} }
    | undefined
) {
  const ref = useRef<
    | { id: number; name: string; token: string; enabled_channels: {} }
    | undefined
  >()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
