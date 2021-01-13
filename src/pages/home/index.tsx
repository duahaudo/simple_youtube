import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { defaultStyle } from '../../style';
import Videos from '../../components/videos';

import useSearch from '../../hooks/useSearch';
import { useEffect } from 'react';

export default function App() {
  const inputRef = useRef(null);

  const [filter, setFilter] = useState('');
  const [video, setVideo] = useState<any | null>(null);
  const [queryFilter, setQueryFilter] = useState('');
  const [loading, fetchedData] = useSearch(queryFilter);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!loading) {
      // @ts-ignore
      if (!!fetchedData && !!fetchedData.success && !!queryFilter) {
        // @ts-ignore
        const newFilterItems = fetchedData.data.items.map((item: any) => {
          return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            snippet: item.snippet,
            thumbnail: item.snippet.thumbnails.default,
          };
        });
        setOptions(newFilterItems);
      }
    }
  }, [loading, fetchedData]);

  return (
    <View style={styles.container}>
      {!video && (
        <View style={styles.filterView}>
          <TextInput
            ref={inputRef}
            autoFocus={true}
            returnKeyType="search"
            enablesReturnKeyAutomatically={true}
            style={defaultStyle.textInput}
            placeholder="Enter your key words"
            value={filter}
            onSubmitEditing={() => setQueryFilter(filter)}
            onChangeText={(text) => {
              setVideo(null);
              setOptions([]);
              setFilter(text);
            }}
          />
          {/* <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => {
              setQueryFilter(filter);
              // @ts-ignore
              inputRef.current.blur();
            }}>
            <View style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  loading ? styles.loading : styles.notLoading,
                ]}>
                Find
              </Text>
              {loading && (
                <ActivityIndicator
                  size="small"
                  animating={!!loading}
                  style={styles.spinner}
                />
              )}
            </View>
          </TouchableOpacity> */}
        </View>
      )}

      {!video && <Videos options={options} showFavourite />}
    </View>
  );
}
