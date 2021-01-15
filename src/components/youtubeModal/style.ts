import { StyleSheet } from 'react-native';
import { color_primary, color_black, padVal, color_text_primary, color_text_secondary, color_secondary } from '../../style';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  playerContainer: {
    backgroundColor: color_secondary,
    flex: 1,
  },
  webView: {
    height: 250,
  },
  title: {
    backgroundColor: color_secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeText: {
    color: color_text_secondary,
  },
  titleText: {
    flex: 0.8,
    color: color_black
  },
  topHeader: {
    marginTop: 25,
    height: 15,
    width: '85%',
    alignSelf: 'center',
    // backgroundColor: color_red1,
    // borderTopStartRadius: 25,
    // borderTopEndRadius: 25,
  },
  description: {
    padding: padVal,
    paddingTop: 0
    // backgroundColor: color_secondary
  },
  descriptionText: {
    color: color_text_secondary
  }
});
