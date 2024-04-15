"use client"
import { z } from "zod"
import { useRef } from "react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useForm, useFormContext, FormProvider } from "react-hook-form"
import { BarkForm, barkSchema } from "./bark"
import { WecomWebhookForm, wecomWebhookSchema } from "./wecom_webhook"
import { WecomAppForm, wecomAppSchema } from "./wecom_app"
import { PushoverForm, pushoverSchema } from "./pushover"
import { PushdeerForm, pushdeerSchema } from "./pushdeer"
import { ChanifyForm, chanifySchema } from "./chanify"
import { EmailForm, emailSchema } from "./email"
import { DiscordWebhookForm, discordWebhookSchema } from "./discord_webhook"
import { TelegramForm, telegramSchema } from "./telegram"
import { NtfyForm, ntfySchema } from "./ntfy"
import { LarkForm, larkSchema } from "./lark"
import { DingtalkForm, dingtalkSchema } from "./dingtalk"
import { AppriseForm, appriseSchema } from "./apprise"
import { CHANNELS } from "./const"
import { BaseChannelForm, baseChannelSchema } from "./base"
import { CACHE } from "@/app/constants"

export function ChannelForm({
  channel,
  onFormChange,
}: {
  channel: any
  onFormChange: any
}) {
  const form = useForm<z.infer<typeof baseChannelSchema>>({
    resolver: async (data) => {
      try {
        switch (data.type) {
          case CHANNELS.BARK:
            data = { ...data, ...barkSchema.parse(data) }
          case CHANNELS.WECOM_WEBHOOK:
            data = { ...data, ...wecomWebhookSchema.parse(data) }
          case CHANNELS.WECOM_APP:
            data = { ...data, ...wecomAppSchema.parse(data) }
          case CHANNELS.PUSHOVER:
            data = { ...data, ...pushoverSchema.parse(data) }
          case CHANNELS.PUSHDEER:
            data = { ...data, ...pushdeerSchema.parse(data) }
          case CHANNELS.CHANIFY:
            data = { ...data, ...chanifySchema.parse(data) }
          case CHANNELS.EMAIL:
            data = { ...data, ...emailSchema.parse(data) }
          case CHANNELS.DISCORD_WEBHOOK:
            data = { ...data, ...discordWebhookSchema.parse(data) }
          case CHANNELS.TELEGRAM:
            data = { ...data, ...telegramSchema.parse(data) }
          case CHANNELS.NTFY:
            data = { ...data, ...ntfySchema.parse(data) }
          case CHANNELS.LARK_WEBHOOK:
            data = { ...data, ...larkSchema.parse(data) }
          case CHANNELS.DINGTALK_WEBHOOK:
            data = { ...data, ...dingtalkSchema.parse(data) }
          case CHANNELS.APPRISE:
            data = { ...data, ...appriseSchema.parse(data) }
        }
        return { values: data, errors: {} }
      } catch (error) {
        // return { values: {}, errors: convertZodErrorsToFormErrors(error) }
        return { values: {}, errors: {} } // Fix this
      }
    },
    defaultValues: channel,
  })

  const { watch: watchForm, control } = form
  const watchAllFields = watchForm()
  const type = watchForm("type")

  const prevType = usePrevious(type)

  useEffect(() => {
    // If the type has changed
    if (type !== prevType) {
      // Reset the form with only id, type, and name
      form.reset({
        id: form.getValues("id"),
        type: type,
        name: form.getValues("name"),
      })
    }
  }, [type, prevType, form])

  const prevWatchAllFields = usePrevious(watchAllFields)

  const deleteChannel = () => {
    // remove the channel from the list
    const confString = localStorage.getItem(CACHE.CHANNELS)

    // Check if confString is null
    if (confString === null) {
      return
    }

    let conf = JSON.parse(confString)
    let newConf = []
    for (let i = 0; i < conf.length; i++) {
      if (conf[i].id !== channel.id) {
        newConf.push(conf[i])
      }
    }
    localStorage.setItem(CACHE.CHANNELS, JSON.stringify(newConf))
  }

  useEffect(() => {
    if (JSON.stringify(watchAllFields) !== JSON.stringify(prevWatchAllFields)) {
      onFormChange(watchAllFields)
    }
  }, [watchAllFields, prevWatchAllFields, onFormChange])

  return (
    <Form {...form}>
      <form className="space-y-3">
        <BaseChannelForm control={control} />

        {type === CHANNELS.BARK && <BarkForm control={control} />}
        {type === CHANNELS.WECOM_WEBHOOK && (
          <WecomWebhookForm control={control} />
        )}
        {type === CHANNELS.WECOM_APP && <WecomAppForm control={control} />}
        {type === CHANNELS.PUSHOVER && <PushoverForm control={control} />}
        {type === CHANNELS.PUSHDEER && <PushdeerForm control={control} />}
        {type === CHANNELS.CHANIFY && <ChanifyForm control={control} />}
        {type === CHANNELS.EMAIL && <EmailForm control={control} />}
        {type === CHANNELS.DISCORD_WEBHOOK && (
          <DiscordWebhookForm control={control} />
        )}
        {type === CHANNELS.TELEGRAM && <TelegramForm control={control} />}
        {type === CHANNELS.NTFY && <NtfyForm control={control} />}
        {type === CHANNELS.LARK_WEBHOOK && <LarkForm control={control} />}
        {type === CHANNELS.DINGTALK_WEBHOOK && (
          <DingtalkForm control={control} />
        )}
        {type === CHANNELS.APPRISE && <AppriseForm control={control} />}
        {/* Add more conditions here for other types */}

        <Button variant="destructive" onClick={deleteChannel}>
          Delete Channel
        </Button>
      </form>
    </Form>
  )
}

export const formSchema = baseChannelSchema.refine((data) => {
  switch (data.type) {
    case CHANNELS.BARK:
      return barkSchema.parse(data)
    case CHANNELS.WECOM_WEBHOOK:
      return wecomWebhookSchema.parse(data)
    case CHANNELS.WECOM_APP:
      return wecomAppSchema.parse(data)
    case CHANNELS.PUSHOVER:
      return pushoverSchema.parse(data)
    case CHANNELS.PUSHDEER:
      return pushdeerSchema.parse(data)
    case CHANNELS.CHANIFY:
      return chanifySchema.parse(data)
    case CHANNELS.EMAIL:
      return emailSchema.parse(data)
    case CHANNELS.DISCORD_WEBHOOK:
      return discordWebhookSchema.parse(data)
    case CHANNELS.TELEGRAM:
      return telegramSchema.parse(data)
    case CHANNELS.NTFY:
      return ntfySchema.parse(data)
    case CHANNELS.LARK_WEBHOOK:
      return larkSchema.parse(data)
    case CHANNELS.DINGTALK_WEBHOOK:
      return dingtalkSchema.parse(data)
    case CHANNELS.APPRISE:
      return appriseSchema.parse(data)
    default:
      throw new Error("Invalid type")
  }
})

// Custom hook to get the previous value of a variable
function usePrevious(
  value:
    | { id: number; type: string; name: string; enabled: boolean }
    | string
    | undefined
) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
