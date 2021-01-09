import React from 'react';
import styles from './style';
import {View} from 'react-native';
import {FormContext} from '../../constant';
import Videos from '../../components/videos';

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default () => {
  // @ts-ignore
  const context = React.useContext(FormContext);
  const favourites = React.useMemo(() => context.favourites || [], [context]);

  return (
    <View style={styles.container}>
      <Videos options={favourites} showFavourite />
    </View>
  );
};
