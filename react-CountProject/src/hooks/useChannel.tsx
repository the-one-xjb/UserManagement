import { getChannelAPI } from '@/apis/article'
import { useEffect, useState } from'react'
export function useChannel () {
    const [channelList,setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    },[])
    return {
        channelList
    }
}
