import {color_white, color_grey1} from './../../style';
import {StyleSheet} from 'react-native';
import {color_primary} from '../../style';

export default StyleSheet.create({
  container: {
    backgroundColor: color_primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  icon: {
    color: color_grey1,
  },
  active: {
    color: color_white,
  },
});
