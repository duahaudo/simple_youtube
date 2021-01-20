import React, { useEffect } from 'react';
import { useState } from 'react';
import { asyncStorageKey_searchResult, SettingContext } from '../constant';
import { IContextSetting } from '../interface';
import moment from 'moment';

import { useSaveItem, useReadItem, IAsyncStorageItem } from './useAsyncStorage';
import useAxios, { IRequest } from "./useAxios"
interface IResponse {
  success: boolean;
  data?: any;
  message?: string;
}

type cacheDataType = {
  term: string,
  searchResult: any[],
  timestamp: string
}

export default (query: string) => {
  const { setting } = React.useContext(SettingContext) as IContextSetting;

  const [fetchedData, setFetchedData] = useState<IResponse | null>(null);

  const [request, setRequest] = useState<IRequest | null>(null)
  const [loading] = useAxios(request)

  const [asyncStorageItem, setAsyncStorageItem] = useState<IAsyncStorageItem>({
    key: asyncStorageKey_searchResult,
  });
  // hook to save data
  useSaveItem(asyncStorageItem);

  const [, readData] = useReadItem(asyncStorageKey_searchResult)

  React.useEffect(() => {
    console.log(readData)
  }, [readData])

  const isTimeStampValid = (timestamp: string) => moment(timestamp).isValid() && moment(timestamp).add(5, 'hour').isAfter(moment())

  const querySuccessHandler = React.useCallback((res) => {
    setFetchedData({
      success: true,
      data: res.data,
    });

    const validCache = readData?.data ? readData.data.filter((item: cacheDataType) => isTimeStampValid(item.timestamp)) : []
    const newData = [
      ...validCache,
      {
        timestamp: moment().toISOString(),
        term: query,
        searchResult: res.data
      }]

    setAsyncStorageItem({
      ...asyncStorageItem,
      data: newData,
    });
  }, [query, readData])

  const queryErrorHandler = React.useCallback((error) => {
    setFetchedData({
      success: false,
      message: error,
    });
  }, [])

  useEffect(() => {
    if (!query) {
      setFetchedData(null);
    } else {
      let cacheResult = null;
      if (readData?.data) {
        cacheResult = readData?.data.find((data: cacheDataType) => isTimeStampValid(data.timestamp) && data.term === query);
        console.log('cacheResult', cacheResult)

        if (cacheResult) {
          setFetchedData({
            success: true,
            data: cacheResult.searchResult || [],
          });
        }
      }

      if (!cacheResult) {
        setRequest({
          url: 'https://youtube.googleapis.com/youtube/v3/search',
          params: {
            part: 'snippet',
            q: query,
          },
          onSuccess: querySuccessHandler,
          onError: queryErrorHandler
        })
      }
    }
  }, [query, setting, readData]);

  return [loading, fetchedData];
};
