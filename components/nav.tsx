import React from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";

import Header from "./header";

const Nav = (props : any) => {
	return (
		<View style={styles.container}>
			<Header
				customStyles={styles.svgCurve}
				customHeight={160}
				customTop={130}
				customBgColor="#5000ca"
				customWavePattern="M0,96L48,112C96,128,192,160,288,
				186.7C384,213,480,235,576,213.3C672,192,768,128,864,
				128C960,128,1056,192,1152,208C1248,224,1344,192,1392,
				176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,
				0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,
				0,96,0,48,0L0,0Z"
			/>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{props.title}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    backgroundColor: '#181818'
  	},
  	headerContainer: {
    	marginTop: 35,
    	marginHorizontal: 10
  	},
	svgCurve: {
		position: 'absolute',
		width: Dimensions.get('window').width
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		// change the color property for better output
		color: '#fff',
		textAlign: 'center',
		marginTop: 25
  	}
});

export default Nav;