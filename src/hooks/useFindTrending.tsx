import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { NativeModules } from "react-native"
import { youtube_key, maxResults, asyncStorageKey_trending } from '../constant';
import { useSaveItem, useReadItem, IAsyncStorageItem } from './useAsyncStorage';
import { SettingContext } from '../constant';
import moment from 'moment';
import { IContextSetting } from '../interface';
import * as RNLocalize from "react-native-localize";

interface IResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export default (needReload: boolean = false) => {
  const { setting } = React.useContext(SettingContext) as IContextSetting;

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<IResponse | null>(null);

  const [isLoaded, savedTrending] = useReadItem(asyncStorageKey_trending);

  const [asyncStorageItem, setAsyncStorageItem] = useState<IAsyncStorageItem>({
    key: asyncStorageKey_trending,
  });
  // hook to save data
  useSaveItem(asyncStorageItem);

  

  useEffect(() => {
    if (isLoaded || needReload) {
      if (
        needReload ||
        !savedTrending ||
        !savedTrending.success ||
        !savedTrending.data ||
        moment(savedTrending.data.timestamp).add(5, 'hour').isBefore(moment())
      ) {
        setLoading(true);
        console.log('Query data ...');
        console.log('RNLocalize.getLocales()', RNLocalize.getCountry())

        axios({
          method: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/videos',
          params: {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            kind: 'youtube#videoListResponse',
            maxResults: setting ? setting.maxResults || maxResults : maxResults,
            type: 'video',
            regionCode: RNLocalize.getCountry(),
            key: youtube_key,
          },
          headers: {
            Accept: 'application/json',
          },
        })
          .then((res) => {
            setLoading(false);
            const trendingData = res.data.items.map((item: any) => {
              const { snippet, id } = item;
              return {
                videoId: id,
                thumbnail: snippet.thumbnails.default,
                title: snippet.title,
                description: snippet.description,
              };
            });

            setFetchedData({
              success: true,
              data: trendingData,
            });

            setAsyncStorageItem({
              ...asyncStorageItem,
              value: {
                timestamp: moment().toISOString(),
                data: trendingData,
              },
            });
          })
          .catch((error) => {
            setLoading(false);
            setFetchedData({
              success: false,
              message: error.message,
            });
          });
      } else {
        setFetchedData({
          success: true,
          data: savedTrending.data.data,
        });
      }
    }
  }, [isLoaded, savedTrending, setting, needReload]);

  return [loading, fetchedData];
};
