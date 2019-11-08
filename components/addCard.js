//addCard.js
import React from 'react'
import {StyleSheet, View, Text, Button, TextInput} from 'react-native'
import {lightgreen, white, black} from '../utilities/colors'

class AddCard extends React.Component{
	state = {
		question: '',
		answer: '',
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style = {styles.para}>What is the question?</Text>
				<TextInput 
					style={styles.textInput}
					onChangeText={(q) => this.setState({ question: q})}
					value={this.state.question}
				>
				</TextInput>
				<Text style = {styles.para}>What is the answer?</Text>
				<TextInput				
					style={styles.textInput}
					onChangeText={(a) => this.setState({ answer: a})}
					value={this.state.answer}
				>
				</TextInput>
				<Button
					color= {lightgreen}
					onPress = {()=> this.props.navigation.getParam('handleSubmit')({front: this.state.question, back: this.state.answer})}
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

export default AddCard