import { color_secondary, text_primary, text_secondary } from './../../style';
import { StyleSheet } from 'react-native';
import { color_primary } from '../../style';

export default StyleSheet.create({
  container: {
    // backgroundColor: color_secondary,
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
    color: text_secondary
  },
  title: {
    marginTop: 3,
    fontSize: 12
  },
  active: {
    color: text_primary,
  },
});
