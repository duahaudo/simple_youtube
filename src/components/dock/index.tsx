import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faCog, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from './style';

import {
  FormContext,
  VIEW_FAVOURITE,
  VIEW_TRENDING,
  VIEW_CONFIG,
} from '../../constant';

interface IIcon {
  icon: any;
  view: number;
  title: string
}

export default () => {
  const icons = React.useMemo<IIcon[]>(
    () => [
      { icon: faStar, view: VIEW_TRENDING, title: "Most Popular" },
      { icon: faHeart, view: VIEW_FAVOURITE, title: "Favourite" },
      { icon: faCog, view: VIEW_CONFIG, title: "Setting" },
    ],
    [],
  );

  // @ts-ignore
  const context = React.useContext(FormContext) as {
    view: number;
    setView: any;
    setShowOverlay: any;
    setShowReload: any;
  };

  return (
    <View style={styles.container}>
      {icons.map((icon: IIcon, idx: number) => {
        let style: any[] = [styles.icon];

        if (icon.view === context.view) {
          style.push(styles.active);
        }

        return (
          <Pressable
            key={idx}
            style={styles.icons}
            onPress={() => {
              context.setView(icon.view);
              context.setShowOverlay(false);
              context.setShowReload(false);
            }}>
            <FontAwesomeIcon icon={icon.icon} style={style} size={20} />
            <Text style={[style, styles.title]}>{icon.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};
