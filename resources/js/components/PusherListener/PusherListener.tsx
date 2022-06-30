import {useEffect} from 'react'
import Pusher from 'pusher-js/with-encryption'
import {toast} from 'react-toastify'

export interface IChannelConfig {
    channelName: string
    messageType: string
    callback: Function
}

Pusher.logToConsole = process.env.MIX_PUSHER_APP_DEBUG ? true : false

const PusherListener = () => {
    useEffect(() => {
        const config: IChannelConfig = {
            channelName: 'order',
            messageType: 'message',
            callback: (data: any) => toast(JSON.stringify(data))
        }
        const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY || '', {
            cluster: process.env.MIX_PUSHER_APP_CLUSTER || '',
            forceTLS: true
        })
        const channel = pusher.subscribe(config.channelName)
        channel.bind(config.messageType, config.callback)

        return () => {
            channel.unbind(config.messageType, config.callback)
        }
    }, [])

    return null
}

export default PusherListener
