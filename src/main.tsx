import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import {
  FormContext,
  SettingContext,
  asyncStorageKey_favourite,
  asyncStorageKey_setting,
  VIEW_HOME,
  VIEW_FAVOURITE,
  VIEW_TRENDING,
  VIEW_CONFIG,
  maxResults,
} from './constant';
import { color_secondary, color_primary, dockHeight, titleHeight, color_white, color_grey1 } from './style';
import SplashScreen from 'react-native-splash-screen';

import Home from './pages/home';
import Favarite from './pages/favourite';
import Trending from './pages/trending';
import Settings from './pages/settings';

import Header from './components/header';
import Dock from './components/dock';

import { useReadItem } from './hooks/useAsyncStorage';
import { ISetting } from './interface';
import { Appearance } from 'react-native'

// console.log(SplashScreen)

export default function App() {
  const [view, setView] = useState(VIEW_TRENDING);
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [showReload, setShowReload] = useState(false);
  const [isLoaded1, savedFavourites] = useReadItem(asyncStorageKey_favourite);
  const [isLoaded2, savedSetting] = useReadItem(asyncStorageKey_setting);
  const [favourites, setfavourites] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [setting, setSetting] = useState<ISetting>({
    maxResults,
    autoplay: true,
    loop: false,
  });

  React.useEffect(() => {
    if (!!isLoaded1 && savedFavourites && savedFavourites.data) {
      setfavourites(savedFavourites.data);
    }
  }, [savedFavourites, isLoaded1]);

  React.useEffect(() => {
    if (!!isLoaded2 && savedSetting && savedSetting.data) {
      setSetting(savedSetting.data);
    }
  }, [savedSetting, isLoaded2]);

  React.useEffect(() => {
    SplashScreen.hide();

    console.log(Appearance.getColorScheme())
  }, [])

  return (
    <View style={[styles.unsafeBackground]}>
      <SafeAreaView style={styles.unsafeBackgroundTop} />

      <SafeAreaView style={styles.container}>
        <FormContext.Provider
          value={{
            view,
            setView,
            favourites,
            setfavourites,
            setShowOverlay,
            setIsModalShowed,
            isModalShowed,
            showReload,
            setShowReload,
          }}>
          <SettingContext.Provider value={{ setting, setSetting }}>
            <View style={styles.header}>
              <Header />
            </View>
            <View style={styles.workSpace}>
              {view === VIEW_HOME && <Home />}
              {view === VIEW_FAVOURITE && <Favarite />}
              {view === VIEW_TRENDING && <Trending />}
              {view === VIEW_CONFIG && <Settings />}
            </View>
            <View style={styles.dock}>
              <Dock />
            </View>
          </SettingContext.Provider>
        </FormContext.Provider>

        {showOverlay && <View style={styles.overlay} />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  unsafeBackground: {
    flex: 1,
  },
  unsafeBackgroundTop: {
    flex: 0,
    backgroundColor: color_primary,
  },
  container: {
    flex: 1,
  },
  workSpace: {
    flexGrow: 1,
    backgroundColor: color_white,
  },
  dock: {
    height: dockHeight
  },
  header: {
    height: titleHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color_primary,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: color_primary,
    opacity: 0.3,
  },
});
