import React from 'react';
import {View, Text, ScrollView, Alert, AlertButton} from 'react-native';
import styles from './style';
import YoutubePlayer from 'react-native-youtube-iframe';
import {decode} from 'html-entities';

export default ({video, clearVideoId}: any) => {
  const showAlert = (error: string) => {
    const title = 'Something wrong happen.';
    const buttons: AlertButton[] = [
      {
        text: 'Close', style: 'destructive', onPress: () => {
          clearVideoId();
        },
      },
    ];
    let errorMessage = '';

    switch (error) {
      case 'video_not_found': {
        errorMessage =
          'This video was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.';
        break;
      }
      case 'embed_not_allowed': {
        errorMessage =
          'The owner of this video does not allow it to be played in embedded players.';
        break;
      }
      case 'HTML5_error': {
        errorMessage =
          'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.';
        break;
      }
      case 'invalid_parameter': {
        errorMessage = 'Unknown reason.';
        break;
      }
    }

    Alert.alert(title, errorMessage, buttons);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.topHeader}></View> */}
      <View style={styles.webViewContainer}>
        <View style={styles.title}>
          <Text
            style={[styles.closeText, styles.titleText]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {decode(video.title)}
          </Text>
          <Text
            style={styles.closeText}
            onPress={() => {
              // fadeOut()
              setTimeout(() => {
                clearVideoId();
              }, 0);
            }}>
            Close
          </Text>
        </View>
        <View style={styles.playerContainer}>
          <View style={styles.webView}>
            <YoutubePlayer
              height={300}
              play={true}
              videoId={video.videoId}
              initialPlayerParams={{
                loop: true,
              }}
              // onChangeState={onStateChange}
              onError={showAlert}
            />
          </View>
          <ScrollView style={styles.description}>
            <Text>{decode(video.description)}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
