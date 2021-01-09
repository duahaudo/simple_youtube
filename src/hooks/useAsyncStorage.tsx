// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface IAsyncStorageItem {
  key: string;
  value?: any;
}

interface IResult {
  success: boolean;
  data?: any;
  error?: any;
}

export const useSaveItem = (props: IAsyncStorageItem) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IResult>();

  useEffect(() => {
    if (props.key && props.value !== null) {
      // value === null => delete key
      setLoading(true);

      const jsonValue = JSON.stringify(props.value);
      AsyncStorage.setItem(props.key, jsonValue)
        .then(() => {
          setResult({
            success: true,
          });
        })
        .catch((error: any) =>
          setResult({
            success: true,
            error,
          }),
        )
        .finally(() => setLoading(false));
    }
  }, [props]);

  return [loading, result];
};

export const useReadItem = (key: string): [boolean, IResult] => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<IResult>({success: false});

  useEffect(() => {
    if (key) {
      setDataLoaded(false);

      AsyncStorage.getItem(key)
        .then((jsonValue: string | null) => {
          setResult({
            success: true,
            data: jsonValue != null ? JSON.parse(jsonValue) : null,
          });
        })
        .catch((error: any) =>
          setResult({
            success: true,
            error,
          }),
        )
        .finally(() => setDataLoaded(true));
    }
  }, [key]);

  return [dataLoaded, result];
};
