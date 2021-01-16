import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Alert, AlertButton, Dimensions, ActivityIndicator } from 'react-native';
import { Button } from "../controls/button"
import styles from './style';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { decode } from 'html-entities';
import { faStopCircle, faPlayCircle, faVolumeMute, faVolumeUp, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");


export default ({ video, clearVideoId }: any) => {
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

  const playerRef = React.useRef<YoutubeIframeRef>(null)

  const [isReady, setIsReady] = useState<boolean>(false)
  const [play, setPlay] = React.useState(true);
  const [volume, setVolume] = React.useState(100)
  const [mute, setMute] = useState(false)

  const buttonOptions = {
    size: 20,
    styleIcon: styles.styleIcon,
    styleWrapper: styles.btn
  }

  const [allPlaybackRate, setAllPlaybackRate] = useState<number[]>([])
  const [playbackRate, setPlaybackRate] = React.useState(1)

  const handlePlayButton = React.useCallback(() => {
    setPlay(!play);
  }, [play])

  const onReadyHandler = React.useCallback(() => {
    setIsReady(true)
    playerRef.current?.getAvailablePlaybackRates().then(
      (rates: number[]) => setAllPlaybackRate(rates))

    // playerRef.current?.getVolume().then(
    //   (volume: number) => setVolume(volume))

  }, [playerRef.current]);

  const onForwardBackwardHandler = React.useCallback((isForward: boolean) => {
    playerRef.current?.getCurrentTime().then((time: number) => {
      playerRef.current?.seekTo(time + (isForward ? 10 : -10), true)
    })
  }, [])

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
              ref={playerRef}
              height={235}
              play={play}
              // volume={volume}
              mute={mute}
              videoId={video.videoId}
              playbackRate={playbackRate}
              initialPlayerParams={{
                loop: true,
                preventFullScreen: true
              }}
              onReady={onReadyHandler}
              // onChangeState={onStateChange}
              onError={showAlert}
            />
          </View>

          {!isReady && <ActivityIndicator size="large" animating={!isReady} />}

          {isReady && <View>

            <View style={styles.playerButtons}>
              <Button icon={play ? faStopCircle : faPlayCircle} {...buttonOptions} onPress={handlePlayButton} />
              <Button icon={mute ? faVolumeUp : faVolumeMute} {...buttonOptions} onPress={() => setMute(!mute)} />
              <Button icon={faBackward} {...buttonOptions} onPress={() => onForwardBackwardHandler(false)} />
              <Button icon={faForward} {...buttonOptions} onPress={() => onForwardBackwardHandler(true)} />
            </View>
            <View style={[styles.playerButtons, styles.playerRateButtons]}>
              {allPlaybackRate.map((rate: number) => {
                return <Button key={rate} {...buttonOptions}
                  styleCaption={styles.btnRate}
                  styleWrapper={{ width: window.width / 5 }} caption={`${rate}x`}
                  onPress={() => setPlaybackRate(rate)} />
              })}
            </View>


          </View>}
          <ScrollView style={styles.description}>
            {/* {play && <Text>- {countDown}</Text>} */}
            <Text style={styles.descriptionText}>{decode(video.description)}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
