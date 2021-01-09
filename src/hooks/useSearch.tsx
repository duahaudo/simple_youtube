import React, {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import {youtube_key, maxResults, SettingContext} from '../constant';
import {IContextSetting} from '../interface';

interface IResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export default (query: string) => {
  const {setting} = React.useContext(SettingContext) as IContextSetting;

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<IResponse | null>(null);

  useEffect(() => {
    if (!query) {
      setFetchedData(null);
    } else {
      setLoading(true);
      axios({
        method: 'GET',
        url: 'https://youtube.googleapis.com/youtube/v3/search',
        params: {
          part: 'snippet',
          maxResults: setting ? setting.maxResults || maxResults : maxResults,
          type: 'video',
          q: query,
          key: youtube_key,
        },
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => {
          setLoading(false);
          setFetchedData({
            success: true,
            data: res.data,
          });
        })
        .catch((error) => {
          setLoading(false);
          setFetchedData({
            success: false,
            message: error.message,
          });
        });
    }
  }, [query, setting]);

  return [loading, fetchedData];
};
