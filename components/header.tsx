import React from "react";
import {View} from "react-native";
import Svg, { Path } from 'react-native-svg';

export default function Header({
    customStyles,
    customHeight,
    customTop,
    customBgColor,
    customWavePattern
  } : any) {
    return (
      <View style={[customStyles, {opacity: .5}]}>
        <View style={{ backgroundColor: customBgColor, height: customHeight }}>
          <Svg
            width="100%"
            viewBox="0 0 1440 320"
            strokeOpacity='0.1'
            style={{ position: 'absolute', top: customTop }}
          >
            <Path fill={customBgColor} d={customWavePattern} />
          </Svg>
        </View>
      </View>
    );
  }