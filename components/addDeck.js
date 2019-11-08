//addDeck.js
import React from 'react'
import {StyleSheet, View, Text, Button, TextInput} from 'react-native'
import {lightgreen, white, black} from '../utilities/colors'


class AddDeck extends React.Component{
	state = {
		text: '',
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.para}>What is the new decks name?</Text>
				<TextInput 
					style={styles.textInput}
					onChangeText={(text) => this.setState({ text: text})}
					value={this.state.text}
				>
				</TextInput>
				<Button
					color={lightgreen}
					onPress={()=> this.props.navigation.getParam('handleSubmit')({cards:[], name:this.state.text})}
					title='submit'>
				></Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput:{
		borderColor: black,
		borderWidth:1,
		height:100,
		width: 300,
		margin: 20
	},
	para:{
		fontSize:20,
	}
})

export default AddDeck