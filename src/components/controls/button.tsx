import React from 'react'
import styles from "./styles"
import { TouchableOpacity, View, Text } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export interface IButton {
  caption?: string
  onPress: () => void
  styleWrapper?: any
  styleIcon?: any
  styleCaption?: any
  icon?: any
  size?: number
}

export const Button = (props: IButton) => {
  return <TouchableOpacity
    style={[styles.buttonWrapper, props.styleWrapper]}
    onPress={props.onPress}
  >
    <View style={[styles.button]}>
      {!!props.caption && <Text style={[styles.buttonText, props.styleCaption]}>{props.caption}</Text>}
      {!!props.icon && <FontAwesomeIcon style={[props.styleIcon]} icon={props.icon} size={props.size || 15} />}
    </View>
  </TouchableOpacity>
}