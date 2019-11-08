//deckList.js
import React from 'react'
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {lightgreen, yellow, white} from '../utilities/colors'
import SelectedDeck from '../components/selectedDeck'
import Cards from '../components/cards'
import AddCard from '../components/addCard'


const Deck = props => {
	return(
		<View style={styles.card}>
			<Button
				color = {lightgreen}
				title={props.deckInstance.name}
				onPress={props.onChooseDeck}
			></Button>
		</View> 
	);
};

export class DeckList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			decks: this.props.navigation.getParam('decks')
		}
	}
	
	saveDeletedCard(cards, deckName){
		var newDecks = []
		for(var i=0; i<this.state.decks.length; i++)
		{
			if(deckName == this.state.decks[i].name)
			{
				newDecks = [...newDecks, {cards: cards, name: deckName}]
			}
			else
			{
				newDecks = [...newDecks, this.state.decks[i]]
			}
		}
		this.setState(
			{decks: newDecks}, 
			()=> {
				this.props.navigation.getParam('saveDecks')(this.state.decks)
			}
		)
	}
	
	saveAddedCard(card, deckName) {
		var newCards = []
		var newDecks = []
		for(var i=0; i<this.state.decks.length; i++)
		{
			if(this.state.decks[i].name == deckName)
			{
				newCards = [...this.state.decks[i].cards, card]
				const lastDecks = newDecks
				newDecks = [...lastDecks, {cards: newCards, name: this.state.decks[i].name}]
			}
			else
			{
				const lastDecks = newDecks
				newDecks = [...lastDecks, this.state.decks[i]]
			}
		}
		this.setState({decks: newDecks}, 
			()=> 
			{
				this.props.navigation.getParam('saveDecks')(this.state.decks)
			}
		)
		
	}
	
	chooseDeck(deck) {
		const choosenDeck = deck
		this.props.navigation.navigate("SelDeck", {deck:choosenDeck, handleAddCard: (card, deckName) => this.saveAddedCard(card, deckName), handleDeleteCard: (cards, deckName) => this.saveDeletedCard(cards, deckName)});
	}
	
	render() {
		const { navigate } = this.props.navigation
		return(
			<View style={styles.container}>
				<Text style={styles.para}>Select a Deck of cards</Text>
				<ScrollView>
					{this.state.decks.map(deck =>
						(
						<Deck
							key = {deck.name}
							deckInstance = {deck}
							onChooseDeck = {() => this.chooseDeck(deck)}
						/>
						)
					)}
				</ScrollView>
			</View>
		)
	}
}

Cards.navigationOptions= {title: "Cards"}
SelectedDeck.navigationOptions = {title: "SelDeck"}
AddCard.navigationOptions = {title: "AddCard"}

const routes = {
	DeckList: {screen: DeckList},
	SelDeck: {screen: SelectedDeck},
	Cards: {screen: Cards},
	AddCard: {screen: AddCard},
}
const options = {
  headerMode: 'none', 
  initialRouteName: 'DeckList',
}
const AppNavigator = createStackNavigator(routes,options)

export default AppNavigator

const styles = StyleSheet.create({
  container: {
	flex: 1,
    alignItems: 'center',
	backgroundColor: white,
	marginTop: 30,
  },
  card:{
    alignItems: 'center',
    justifyContent: 'center',
	backgroundColor: yellow,
	borderRadius: 10,
	height: 300,
	width: 300,
	margin: 8,
  },
  para:{
	  fontSize:20,
  },
});