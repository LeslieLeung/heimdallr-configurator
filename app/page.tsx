"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useToast } from "@/components/ui/use-toast"

import { useRef, useState, useEffect, Key } from "react"

import { ChannelForm } from "@/components/channel/channel"
import { Navigation } from "@/components/common/nav"
import { GroupForm } from "@/components/group/group"
import { ClearButton } from "@/components/common/clear"
import { CACHE } from "@/app/constants"

export default function Home() {
  const textareaRef = useRef(null)
  const { toast } = useToast()

  const initialChannels =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(CACHE.CHANNELS) ?? "[]") || [
          { type: "", name: "" },
        ]
      : [{ type: "", name: "" }]
  const [channels, setChannels] = useState(initialChannels)

  const initialGroups =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(CACHE.GROUPS) ?? "[]") || [{ name: "" }]
      : [{ name: "" }]
  const [groups, setGroups] = useState(initialGroups)

  const refreshDisplay = () => {
    let out = ""
    let enabledGroups = []
    // groups
    let groups = JSON.parse(localStorage.getItem(CACHE.GROUPS))
    if (groups === null) {
      return
    }
    for (let i = 0; i < groups.length; i++) {
      let group = groups[i]
      out += "# group " + group.name + "\n"
      out += group.name + "_TOKEN=" + group.token + "\n"
      out += group.name + "_ENABLED_CHANNELS=" + group.enabled_channels + "\n"
      out += "\n"
      enabledGroups.push(group.name)
    }
    out += "ENABLED_GROUPS=" + enabledGroups + "\n\n"

    // channels
    let channels = JSON.parse(localStorage.getItem(CACHE.CHANNELS))
    if (channels === null) {
      return
    }
    for (let i = 0; i < channels.length; i++) {
      let channel = channels[i]
      if (channel.enabled === false) {
        continue
      }
      // iterate over the keys
      let keys = Object.keys(channel)
      out += "# channel " + channel.name + "\n"
      out += channel.name + "_type=" + channel.type + "\n"
      for (let j = 0; j < keys.length; j++) {
        if (
          keys[j] === "type" ||
          keys[j] === "name" ||
          keys[j] === "enabled" ||
          keys[j] === "id"
        ) {
          continue
        }
        let k = keys[j].toUpperCase()
        // k might need some more mapping
        out += channel.name + "_" + k + "=" + channel[keys[j]] + "\n"
      }
      out += "\n"
    }

    textareaRef.current.value = out
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE.CHANNELS, JSON.stringify(channels))
      localStorage.setItem(CACHE.GROUPS, JSON.stringify(groups))
    }
    refreshDisplay()
  }, [channels, groups])

  const addChannel = () => {
    // Retrieve the lastId from localStorage, or default to 0 if it doesn't exist
    let lastId =
      typeof window !== "undefined" &&
      localStorage.getItem(CACHE.LAST_CHANNEL_ID)
        ? parseInt(localStorage.getItem(CACHE.LAST_CHANNEL_ID))
        : 0

    const newChannel = {
      id: lastId,
      type: "",
      name: "",
      enabled: true,
    }

    // Increment the lastId and store it in localStorage
    lastId++
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE.LAST_CHANNEL_ID, lastId.toString())
    }

    const newChannels = [...channels, newChannel]
    setChannels(newChannels)
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE.CHANNELS, JSON.stringify(newChannels))
    }
  }

  const addGroup = () => {
    let lastId =
      typeof window !== "undefined" && localStorage.getItem(CACHE.LAST_GROUP_ID)
        ? parseInt(localStorage.getItem(CACHE.LAST_GROUP_ID))
        : 0

    const newGroup = {
      id: lastId,
      name: "",
      token: "",
      enabled_channels: [],
    }

    lastId++
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE.LAST_GROUP_ID, lastId.toString())
    }

    const newGroups = [...groups, newGroup]
    setGroups(newGroups)
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE.GROUPS, JSON.stringify(newGroups))
    }
  }

  const updateChannel = (newChannel: any, index: string | number) => {
    const newCards = [...channels]
    newCards[Number(index)] = newChannel
    setChannels(newCards)
  }

  const updateGroup = (newGroup: any, index: string | number) => {
    const newGroups = [...groups]
    newGroups[Number(index)] = newGroup
    setGroups(newGroups)
  }

  const handleCopy = () => {
    const text = textareaRef.current?.value ?? ""
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
    })
  }

  const handleExport = () => {
    const text = textareaRef.current?.value ?? ""
    const blob = new Blob([text], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "env"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Navigation />
      <main className="flex flex-wrap">
        <div className="w-1/2 p-4">
          <div className="flex flex-col space-y-4 border rounded-lg p-4">
            <Tabs defaultValue="channels">
              <TabsList>
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
              <TabsContent value="channels">
                <div className="flex flex-col space-y-4">
                  {channels.map((channel: any, i: Key | null | undefined) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>Channel #{channel.id}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChannelForm
                          channel={channel}
                          onFormChange={(newGroup: any) =>
                            updateChannel(newGroup, i)
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addChannel}>Add Channel</Button>
                </div>
              </TabsContent>
              <TabsContent value="groups">
                <div className="flex flex-col space-y-4">
                  {groups.map((group: any, i: Key | null | undefined) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>Group #{group.id + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <GroupForm
                          group={group}
                          onFormChange={(newGroup: any) =>
                            updateGroup(newGroup, i)
                          }
                        />
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={addGroup}>Add Group</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="w-1/2 p-4 flex flex-col flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col flex-grow space-y-3 border rounded-lg p-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>
              <div className="flex space-x-2">
                <ClearButton />
              </div>

              <div className="w-full space-y-2 flex flex-col flex-grow">
                <Textarea
                  ref={textareaRef}
                  className="flex-grow resize-none"
                  suppressHydrationWarning
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
