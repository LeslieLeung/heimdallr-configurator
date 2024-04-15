import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useRef } from "react"
import { CACHE } from "@/app/constants"

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  token: z.string(),
  enabled_channels: z.array(z.string()),
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
                <Input {...field} placeholder="Enabled Channels" />
                <FormDescription>
                  Enter the enabled channels. Recommended to copy from the right
                  panel.
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
    | { id: number; name: string; token: string; enabled_channels: string[] }
    | undefined
) {
  const ref = useRef<
    | { id: number; name: string; token: string; enabled_channels: string[] }
    | undefined
  >()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
