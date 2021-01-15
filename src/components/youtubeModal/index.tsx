import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Alert, AlertButton, Dimensions } from 'react-native';
import { Button } from "../controls/button"
import styles from './style';
import YoutubePlayer from 'react-native-youtube-iframe';
import { decode } from 'html-entities';
import { color_primary } from "../../style"

import { faStopCircle, faPlayCircle, faVolumeUp, faVolumeDown } from '@fortawesome/free-solid-svg-icons';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


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

  const playerRef = React.useRef()
  const [play, setPlay] = React.useState(true);
  const [volume, setVolume] = React.useState(50)

  const buttonOptions = {
    size: 20,
    styleIcon: styles.styleIcon,
    styleWrapper: styles.btn
  }

  const [allPlaybackRate, setAllPlaybackRate] = useState<number[]>([])
  const [playbackRate, setPlaybackRate] = React.useState(1)
  const [duration, setDuration] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const [countDown, setCountDown] = useState<string>("")

  useEffect(() => {
    if (!!duration && !!currentTime) {
      let time: number = currentTime;

      setInterval(() => {
        setCountDown(millisecondsToStr(Math.floor(duration - time) * 1000))
      }, 1000)
    }
  }, [duration, currentTime])

  React.useEffect(() => {
    if (!!playerRef && !!playerRef.current && video.videoId) {
      setTimeout(() => {
        playerRef.current?.getAvailablePlaybackRates().then(
          (rates: number[]) => setAllPlaybackRate(rates))

        playerRef.current?.getDuration().then(
          (duration: number) => setDuration(duration))

        playerRef.current?.getCurrentTime().then(
          (currentTime: number) => setCurrentTime(currentTime))
      }, 800)
    }
  }, [playerRef, video.videoId])

  const handlePlayButton = React.useCallback(() => {
    if (!play) {
      playerRef.current?.getCurrentTime().then(
        (currentTime: number) => {
          setPlay(!play);
          setCurrentTime(currentTime)
        })
    } else {
      setPlay(!play);
    }
  }, [play])

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
              volume={volume}
              videoId={video.videoId}
              playbackRate={playbackRate}
              initialPlayerParams={{
                loop: true,
                preventFullScreen: true
              }}

              // onChangeState={onStateChange}
              onError={showAlert}
            />
          </View>
          <View style={styles.playerButtons}>
            <Button icon={play ? faStopCircle : faPlayCircle} {...buttonOptions} onPress={handlePlayButton} />
            <Button icon={faVolumeDown} {...buttonOptions} onPress={() => setVolume(volume > 0 ? volume - 10 : 0)} />
            <Button icon={faVolumeUp} {...buttonOptions} onPress={() => setVolume(volume < 90 ? volume + 10 : 100)} />
          </View>
          <View style={[styles.playerButtons, styles.playerRateButtons]}>
            {allPlaybackRate.map((rate: number) => {
              return <Button key={rate} {...buttonOptions}
                styleCaption={styles.btnRate}
                styleWrapper={{ width: window.width / 5 }} caption={`${rate}x`}
                onPress={() => setPlaybackRate(rate)} />
            })}
          </View>
          <ScrollView style={styles.description}>
            {play && <Text>- {countDown}</Text>}
            <Text style={styles.descriptionText}>{decode(video.description)}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export const millisecondsToStr = (milliseconds: number): string => {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding(number: number) {
    return (number > 1) ? 's' : '';
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + ' year' + numberEnding(years);
  }
  //TODO: Months! Maybe weeks?
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + ' day' + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + ' hour' + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + ' minute' + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
    return seconds + ' second' + numberEnding(seconds);
  }
  return 'less than a second'; //'just now' //or other string you like;
};