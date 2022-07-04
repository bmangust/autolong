import Pusher, {Channel} from 'pusher-js/with-encryption'
import {useCallback} from 'react'

export interface IChannelConfig {
    channelName: string
    messageType: string
    callback: Function
}

export interface ISavedChannel {
    channel?: Channel
    config: IChannelConfig
    subscribe: () => void
    unsubscribe: () => void
}

Pusher.logToConsole = process.env.MIX_PUSHER_APP_DEBUG ? true : false
let pusher: Pusher | null = null

export const usePusher = (config: IChannelConfig): ISavedChannel => {
    const {channelName, messageType, callback} = config

    if (!pusher) {
        console.log('new pusher')
        pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY || '', {
            cluster: process.env.MIX_PUSHER_APP_CLUSTER || '',
            forceTLS: true
        })
    }
    const channel = pusher.subscribe(channelName)
    const subscribe = useCallback(
        () => channel.bind(messageType, callback),
        [messageType, callback, channel]
    )

    const unsubscribe = useCallback(
        () => channel.unbind(messageType, callback),
        [messageType, callback, channel]
    )

    return {
        channel,
        config,
        subscribe,
        unsubscribe
    }
}
