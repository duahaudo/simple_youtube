import React, { useEffect } from 'react';
import { useState } from 'react';
import { SettingContext } from '../constant';
import { IContextSetting } from '../interface';

import useAxios, { IRequest } from "./useAxios"
interface IResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export default (query: string) => {
  const { setting } = React.useContext(SettingContext) as IContextSetting;

  const [fetchedData, setFetchedData] = useState<IResponse | null>(null);

  const [request, setRequest] = useState<IRequest | null>(null)
  const [loading] = useAxios(request)

  const querySuccessHandler = React.useCallback((res) => {
    setFetchedData({
      success: true,
      data: res.data,
    });
  }, [])

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
  }, [query, setting]);

  return [loading, fetchedData];
};
