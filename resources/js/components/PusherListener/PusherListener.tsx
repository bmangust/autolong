import {useCallback, useEffect} from 'react'
import Pusher from 'pusher-js/with-encryption'
import {toast} from 'react-toastify'
import {usePusher} from './usePusher'

export interface IChannelConfig {
    channelName?: string
    messageType?: string
    callback?: (data: string) => void
}

Pusher.logToConsole = process.env.MIX_PUSHER_APP_DEBUG ? true : false

const PusherListener = ({
    channelName = 'order',
    messageType = 'message',
    callback
}: IChannelConfig) => {
    const cb = useCallback(
        (data: any) =>
            callback
                ? callback(JSON.stringify(data))
                : toast(JSON.stringify(data)),
        [callback]
    )

    const savedChannel = usePusher({
        channelName,
        messageType,
        callback: cb
    })
    useEffect(() => {
        savedChannel.subscribe()
        return () => {
            savedChannel.unsubscribe()
        }
    }, [savedChannel])

    return null
}

export default PusherListener
