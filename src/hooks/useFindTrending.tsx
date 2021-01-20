import React, { useEffect } from 'react';
import { useState } from 'react';
import { asyncStorageKey_trending } from '../constant';
import { useSaveItem, useReadItem, IAsyncStorageItem } from './useAsyncStorage';
import { SettingContext } from '../constant';
import moment from 'moment';
import { IContextSetting } from '../interface';

import useAxios, { IRequest } from "./useAxios"

interface IResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export default (needReload: boolean = false) => {
  const { setting } = React.useContext(SettingContext) as IContextSetting;

  const [fetchedData, setFetchedData] = useState<IResponse | null>(null);

  const [isLoaded, savedTrending] = useReadItem(asyncStorageKey_trending);

  const [request, setRequest] = useState<IRequest | null>(null)
  const [loading] = useAxios(request)

  const [asyncStorageItem, setAsyncStorageItem] = useState<IAsyncStorageItem>({
    key: asyncStorageKey_trending,
  });
  // hook to save data
  useSaveItem(asyncStorageItem);


  const querySuccessHandler = React.useCallback((res: any) => {
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
      data: {
        timestamp: moment().toISOString(),
        data: trendingData,
      },
    });
  }, [asyncStorageItem])

  const queryErrorHandler = React.useCallback((error: string) => {
    // console.log('queryErrorHandler', error)
    setFetchedData({
      success: false,
      message: error,
    });
  }, [])

  useEffect(() => {
    if (isLoaded || needReload) {
      if (
        needReload ||
        !savedTrending ||
        !savedTrending.success ||
        !savedTrending.data ||
        moment(savedTrending.data.timestamp).add(5, 'hour').isBefore(moment())
      ) {

        setRequest({
          url: 'https://www.googleapis.com/youtube/v3/videos',
          params: {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            kind: 'youtube#videoListResponse'
          },
          onSuccess: querySuccessHandler,
          onError: queryErrorHandler
        })

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
