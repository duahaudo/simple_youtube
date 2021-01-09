import React from 'react';
import {View, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar, faCog, faHeart} from '@fortawesome/free-solid-svg-icons';
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
}

export default () => {
  const icons = React.useMemo<IIcon[]>(
    () => [
      {icon: faHeart, view: VIEW_FAVOURITE},
      {icon: faStar, view: VIEW_TRENDING},
      {icon: faCog, view: VIEW_CONFIG},
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
            <FontAwesomeIcon icon={icon.icon} style={style} size={25} />
          </Pressable>
        );
      })}
    </View>
  );
};
