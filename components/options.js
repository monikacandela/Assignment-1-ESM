//Options.js
import React from 'react'
import {StyleSheet, View, Text, Button, Alert} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {lightgreen, yellow, white} from '../utilities/colors'
import AddDeck from '../components/addDeck'
import RemoveDeck from '../components/removeDeck'
import RenameDeck from '../components/renameDeck'

class Options extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			decks: this.props.navigation.getParam('decks')
		}
	}
	
	saveAddedDeckhere(deck) {
		this.props.navigation.getParam('addDecks')(deck)
	}
	
	removeDeck(deckName) {
		Alert.alert(
			'Warning',
			'Are you sure?',
			[
				{text: 'YES', onPress: ()=> this.props.navigation.getParam('removeDeck')(deckName)},
				{text: 'NO', onPress: ()=> this.props.navigation.navigate("Options")},
			],
			{cancelable: false},
		);
		
	}
	
	renameDeck(deckName, newDeckName) {
		Alert.alert(
			'Warning',
			'Are you sure?',
			[
				{text: 'YES', onPress: ()=> this.props.navigation.getParam('renameDeck')(deckName, newDeckName)},
				{text: 'NO', onPress: ()=> this.props.navigation.navigate("Options")},
			],
			{cancelable: false},
		);
	}
	
   render() {
     const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>
				<View style = {styles.deckCard}>
					<View style={styles.btn}>
						<Button 
							color= {lightgreen}
							title="Add a new Deck"
							onPress={() => this.props.navigation.navigate("Add", {handleSubmit: deck => this.saveAddedDeckhere(deck)})}
						/>
					</View>
					<View style={styles.btn}>
						<Button 
							color= {lightgreen}
							title="Remove an existing Deck"
							onPress={() => this.props.navigation.navigate("Remove", {decks: this.state.decks, handleSubmit: deckName => this.removeDeck(deckName)})}
						/>
					</View>
					<View style={styles.btn}>
						<Button 
							color= {lightgreen}
							title="Rename an existing Deck"
							onPress={() => this.props.navigation.navigate("Rename", {decks: this.state.decks, handleSubmit: (deckName, newDeckName) => this.renameDeck(deckName, newDeckName)})}
						/>
					</View>
				</View>
			</View>
      )
  }
}

AddDeck.navigationOptions = {title: "AddDeck"}
RemoveDeck.navigationOptions = {title: "RemoveDeck"}
RenameDeck.navigationOptions = {title: "RenameDeck"}

const routes = {
  Options: {screen: Options},
  Add: {screen: AddDeck},
  Remove: {screen: RemoveDeck},
  Rename: {screen: RenameDeck}
}
const options = {
  headerMode: 'none',
  initialRouteName: 'Options',
}
const AppNavigator = createStackNavigator(routes,options)

export default AppNavigator

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: white,
		padding: 35,
	},
	deckCard:{
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: yellow,
		borderRadius: 10,
		width: 300,
		margin: 8,
	},
	btn:{
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	}
})

