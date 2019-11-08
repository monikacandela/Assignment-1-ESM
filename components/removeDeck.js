//removeDeck.js
import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import {lightgreen} from '../utilities/colors'

class RemoveDeck extends React.Component{
	state = {
		decks: this.props.navigation.getParam('decks')
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.para}>What deck do you want to remove?</Text>
				{Object.keys(this.state.decks).map((deck) =>{
					const name = (this.state.decks[deck].name)
					return(
						<View style={styles.btn} key = {deck} >
							<Button
								color = {lightgreen}
								onPress={()=>this.props.navigation.getParam('handleSubmit')(name)}
								title = {name}
							></Button>
						</View>
					)
				})}
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

export default RemoveDeck