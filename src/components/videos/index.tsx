import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import {
  Pressable,
  ScrollView,
  Image,
  Text,
  Modal,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './style';
import { FormContext, asyncStorageKey_favourite } from '../../constant';
import { color_text_primary, color_text_secondary, color_pink, color_secondary } from '../../style';
import { defaultStyle } from '../../style';
import { reject } from 'lodash';
import { decode } from 'html-entities';

import Youtube from '../youtubeModal';
import Dock from '../dock';

import { useSaveItem, IAsyncStorageItem } from '../../hooks/useAsyncStorage';

export default ({
  options,
  showFavourite,
  refreshingIndicator,
  onRefresh,
}: {
  options: any[];
  showFavourite: boolean;
  onRefresh?: any;
  refreshingIndicator?: boolean;
}) => {
  const [video, setVideo] = useState(null);
  const [asyncStorageItem, setAsyncStorageItem] = useState<IAsyncStorageItem>({
    key: asyncStorageKey_favourite,
  });
  // hook to save data
  useSaveItem(asyncStorageItem);

  // @ts-ignore
  const context = React.useContext(FormContext) as {
    favourites: any[];
    setfavourites: any;
    setShowOverlay: any;
    setIsModalShowed: any;
    showReload: boolean;
    setShowReload: any;
  };
  const favourites = React.useMemo<any[]>(
    () => (context.favourites ? context.favourites : []),
    [context],
  );

  const setFavouritesHandler = React.useCallback(
    (option: any) => {
      // @ts-ignore
      const { setfavourites } = context;
      let favourites = context.favourites ? context.favourites : [];
      const isExist = favourites.find(
        (vid: any) => vid.videoId === option.videoId,
      );
      let newFavourites = [];
      if (!isExist) {
        newFavourites = [...favourites, option];
      } else {
        newFavourites = reject(
          favourites,
          (vid: any) => vid.videoId === option.videoId,
        );
      }

      // console.log(newFavourites)
      // update UI
      setfavourites(newFavourites);
      // save to storage
      setAsyncStorageItem({
        ...asyncStorageItem,
        value: newFavourites,
      });
    },
    [context, favourites],
  );

  return (
    <ScrollView
      style={styles.optionItems}
      refreshControl={
        onRefresh && (
          <RefreshControl
            refreshing={!!refreshingIndicator}
            onRefresh={() => onRefresh()}
          />
        )
      }>
      {options.map((option: any, idx: number) => {
        // @ts-ignore
        const isExist = favourites.find(
          (vid: any) => vid.videoId === option.videoId,
        );
        let optionItemStyles = [styles.optionItem];

        if (options.length - 1 === idx) {
          // @ts-ignore
          optionItemStyles.push(styles.noBorder);
        }

        return (
          <Pressable
            key={idx}
            onPress={() => {
              setVideo(option);
              context.setIsModalShowed(true);
            }}>
            <View style={[styles.itemWrapper, idx === options.length - 1 && styles.lastItemWrapper]}>
              <View style={styles.thumbnailWrapper}>
                <Image
                  style={styles.thumbnail}
                  source={{ uri: option.thumbnail.url }}
                />
              </View>
              <View style={optionItemStyles}>
                <View style={styles.videoTitleWrapper}>
                  <View style={styles.videoTitle}>
                    <Text style={styles.optionItemText}>
                      {decode(option.title)}{' '}

                    </Text>
                  </View>

                </View>
                <Text style={styles.optionDescription}>
                  {decode(option.description)}
                </Text>
              </View>
              {showFavourite && (
                <Pressable style={styles.videoFavourite} onPress={() => setFavouritesHandler(option)}>
                  <View style={styles.videoFavourite}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      size={18}
                      color={isExist ? color_pink : color_text_secondary}
                    />
                  </View>
                </Pressable>

              )}
            </View>
          </Pressable>
        );
      })}

      {options.length === 0 && (
        <View style={defaultStyle.noResultWrapper}>
          <View>
            <Text style={defaultStyle.noResultText}>No video.</Text>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!video}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <SafeAreaView style={styles.modalWrapper}>
          <Youtube
            video={video}
            clearVideoId={() => {
              setVideo(null);
              context.setShowOverlay(false);
              context.setIsModalShowed(false);
            }}
          />
          <View style={styles.dockWrapper}>
            <Dock />
          </View>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};
