import { StyleSheet } from 'react-native';
import { color_primary, color_black, padVal, color_grey1, color_text_secondary, color_secondary, mVal } from '../../style';

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
    // height: 240
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
    alignSelf: 'center'
  },
  description: {
    padding: padVal,
    paddingTop: 0
  },
  descriptionText: {
    color: color_text_secondary
  },
  playerButtons: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: padVal
  },
  playerRateButtons: {
    marginVertical: mVal,
    flexWrap: "wrap"
  },
  btn: {
    flex: 1
  },
  btnRate: {
    color: color_primary
  },
  styleIcon: {
    color: color_primary
  }
});
