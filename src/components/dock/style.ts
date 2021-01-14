import { color_secondary, text_primary, text_iconMenu, color_grey1, color_primary } from './../../style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  icons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    borderTopWidth: 1,
    borderTopColor: `${color_grey1}80`
  },
  icon: {
    color: text_iconMenu
  },
  title: {
    marginTop: 3,
    fontSize: 12
  },
  active: {
    color: color_primary,
  },
});
