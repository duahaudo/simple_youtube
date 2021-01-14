import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import { color_primary, iconSize, text_primary, text_iconMenu } from "../../style";
import { Appearance } from 'react-native'

import {
  VIEW_FAVOURITE,
  VIEW_HOME,
  VIEW_TRENDING,
  VIEW_CONFIG,
  FormContext,
} from '../../constant';
import styles from './style';
const logo = require('../../assets/icons/icon2-1024.png');

export default () => {
  // @ts-ignore
  const { view, setView } = React.useContext(FormContext);
  const barStyle = React.useMemo(() => {
    if (Appearance.getColorScheme() === "light") {
      return "dark-content"
    } else if (Appearance.getColorScheme() === "dark") {
      return "light-content"
    }
    return 'default'
  }, [])

  const [breadcrumbs, setBreadcrumbs] = React.useState<string[]>([])

  const searchIconPressHandler = React.useCallback(() => {
    console.log(breadcrumbs)

    if (view === VIEW_HOME) {
      setView(breadcrumbs[0])
      setBreadcrumbs([])
    } else {
      setBreadcrumbs([view])
      setView(VIEW_HOME)
    }

  }, [breadcrumbs, view])

  return (
    <View style={styles.headerWrapper}>
      <StatusBar barStyle={barStyle} backgroundColor={color_primary} />
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={logo} />
          </View>
          <Text style={styles.titleText}>
            {view === VIEW_HOME && 'Find Your Videos'}
            {view === VIEW_FAVOURITE && 'Your Favourites'}
            {view === VIEW_TRENDING && 'Most Popular Videos'}
            {view === VIEW_CONFIG && 'Settings'}
          </Text>
          <Pressable
            style={styles.searchWrapper}
            onPress={searchIconPressHandler}>
            <FontAwesomeIcon icon={faSearch} style={{ ...styles.icon, color: view === VIEW_HOME ? text_primary : text_iconMenu }} size={iconSize} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
