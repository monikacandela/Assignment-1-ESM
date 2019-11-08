//renameDeck.js
import React from 'react'
import {StyleSheet, View, Text, Button, Picker, TextInput} from 'react-native'
import {lightgreen} from '../utilities/colors'


class RenameDeck extends React.Component{
	state = {
		decks: this.props.navigation.getParam('decks'),
		text: "",
		choosen: "",
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.para}>What deck do you want to rename?</Text>
				<Picker
					selectedValue={this.state.choosen}
					style={{height:50, width: 200, borderColor: '#000000', borderWidth:1,}}
					onValueChange={(value) => {
						if(value!="0")
						(this.setState({choosen: value}))
					}
				}>
				<Picker.Item key = "0" label = "select a Deck" value= "0"/>
				{Object.keys(this.state.decks).map((deck)=> {
					const name = (this.state.decks[deck].name)
					return( <Picker.Item key = {deck} label = {name} value = {name}/>)
				})}
				</Picker>
				<TextInput 
					style={{borderColor: '#000000',borderWidth:1, height:100, width: 300, margin: 20}}
					onChangeText={(text) => this.setState({ text: text})}
					value={this.state.text}
				>
				</TextInput>
				<View style = {styles.btn}>
					<Button
						color={lightgreen}
						onPress={()=> this.props.navigation.getParam('handleSubmit')(this.state.choosen, this.state.text)}
						title='submit'>
					></Button>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
	},
	para:{
		fontSize:20,
		margin: 20,
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	}
})

export default RenameDeck