import React, { useState, useMemo } from 'react'
import { youtube_key, youtube_key2, youtube_key3, maxResults, SettingContext } from "../constant"
import { IContextSetting } from '../interface';
import * as RNLocalize from "react-native-localize";
import axios from 'axios';

export interface IYoutubeParams {
  part?: string
  chart?: string
  kind?: string
  q?: string
}

export interface IRequest {
  method?: "GET" | "POST"
  url: string
  params: Exclude<IYoutubeParams, "key">
  onSuccess: (res: any) => void
  onError: (error: string) => void
}

export default (props: IRequest | null) => {

  const { setting } = React.useContext(SettingContext) as IContextSetting;
  const [loading, setLoading] = useState(false)

  const keys = useMemo(() => [youtube_key, youtube_key2, youtube_key3], [])

  React.useEffect(() => {
    if (props === null) {
      setLoading(false);
    } else {
      setLoading(true)

      const axiosFn = (keyIndex: number) => {
        console.log('keyIndex', keyIndex, keys[keyIndex])
        axios({
          method: props.method || "GET",
          url: props.url,
          params: {
            ...props.params,

            regionCode: RNLocalize.getCountry(),
            type: 'video',
            maxResults: setting ? setting.maxResults || maxResults : maxResults,
            key: keys[keyIndex]
          },
          headers: {
            Accept: 'application/json',
          },
        })
          .then((res: any) => {
            props.onSuccess(res)
          })
          .catch((error: any) => {
            console.log(`key ${keyIndex} ${keys[keyIndex]}`, error)
            props.onError(error)

            if (keyIndex < keys.length - 1) {
              // try new key
              const newIndex = keyIndex + 1;
              axiosFn(newIndex);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }

      // console.log('RUN axios')
      axiosFn(0)
    }
  }, [props, keys])

  return [loading]
}