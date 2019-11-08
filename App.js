import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import decks from './utilities/flashcards' 
import DeckList from './components/deckList'
import Options from './components/options'
import {lightgreen, yellow, white} from './utilities/colors'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			decks: decks
		}
	}
	
	saveDecks(newDecks){
		this.setState(
			{decks: newDecks}
		)
	}
	
	addDecks(deck){
		if(deck.name == "")
		{
			Alert.alert(
				'Alert',
				'Deck name cannot be empty',
				[
					{text: 'OK'},
				],
				{cancelable: false},
			);
		}
		else
		{
			var bool = true
			for(var i=0; i<this.state.decks.length; i++)
			{
				if(deck.name == this.state.decks[i].name)
				{
					Alert.alert(
						'Alert deck not added',
						'Deck name already exists, try with another name',
						[
							{text: 'OK'},
						],
						{cancelable: false},
					);
					bool = false
				}
			}
			if(bool == true)
			{
				const newDeck = deck
				const newDecks = [...this.state.decks, newDeck]
				this.setState(
					{ decks: newDecks}, 
					()=> {
						Alert.alert(
						'Deck',
						'Added',
						[
							{text: 'OK'},
						],
						{cancelable: false},
						);
						this.props.navigation.navigate("App") //to go back
						this.props.navigation.navigate("Decks", {decks: this.state.decks, saveDecks: newDecks => this.saveDecks(newDecks)})
					}
				)
				
			}
		}
	}
	
	removeDeck(deckName)
	{
		var newDecks = []
		for(var i=0; i<this.state.decks.length; i++)
		{
			if(deckName != this.state.decks[i].name)
			{
				newDecks = [...newDecks, this.state.decks[i]]
			}
		}
		this.setState(
			{decks: newDecks}, 
			()=> {
				this.props.navigation.navigate("App")
				this.props.navigation.navigate("Decks", {decks: this.state.decks, saveDecks: newDecks => this.saveDecks(newDecks)})
			}
		)
	}
	
	renameDeck(deckName, newDeckName)
	{
		
		if(deckName == "")
		{
			Alert.alert(
				'Alert',
				'Selection not valid, select a Deck',
				[
					{text: 'OK'},
				],
				{cancelable: false},
			);
		}
		else if(newDeckName == "")
		{
			Alert.alert(
				'Alert',
				'Deck Name can not be empty',
				[
					{text: 'OK'},
				],
				{cancelable: false},
			);
		}
		else
		{
			var newDeckList = []
			for(var i=0; i<this.state.decks.length; i++)
			{
				if(deckName == this.state.decks[i].name)
				{
					const newDeck = {cards: this.state.decks[i].cards, name: newDeckName}
					newDeckList = [...newDeckList, newDeck]
				}
				else
				{
					newDeckList = [...newDeckList, this.state.decks[i]]
				}
			}
			this.setState(
				{decks: newDeckList},
				()=>{
					this.props.navigation.navigate("App")
					this.props.navigation.navigate("Decks", {decks: this.state.decks, saveDecks: newDecks => this.saveDecks(newDecks)})
				}
			)
		}
	}
	
	render () {
		return(
			<View style={styles.container}>
				<View style = {styles.deckCard}>
					<View style = {styles.btn}>
						<Button
							color = {lightgreen}
							title = " Play "
							onPress = {()=> this.props.navigation.navigate("Decks", {decks: this.state.decks, saveDecks: newDecks => this.saveDecks(newDecks)})}
						></Button>
					</View>
					<View style = {styles.btn}>
						<Button
							color = {lightgreen}
							title=" Options "
							onPress = {() => this.props.navigation.navigate("Options", {decks: this.state.decks, addDecks: newDeck => this.addDecks(newDeck), removeDeck: deckName => this.removeDeck(deckName), renameDeck: (deckName, newDeckName) => this.renameDeck(deckName, newDeckName)})}
						></Button>
					</View>
				</View>
			</View>
		)
	}
}

DeckList.navigationOptions = {title: "Decks"}
Options.navigationOptions = {title: "Options"}

const routes = {
	App: {screen: App},
	Options: {screen: Options},
	Decks: {screen: DeckList}
}

const options = {
	headerMode: 'screen',
	initialRouteName: 'App'
}

const AppNavigator = createStackNavigator(routes, options)
const AppContainer = createAppContainer(AppNavigator)
export default AppContainer

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
