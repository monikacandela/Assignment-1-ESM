//selectedDeck.js
import React from 'react'
import {StyleSheet, Text, View, Button, Alert} from 'react-native'
import {lightgreen, yellow, black, white} from '../utilities/colors'
import {createStackNavigator} from 'react-navigation-stack'

export default class SelectedDeck extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: this.props.navigation.getParam('deck'),
			cards: this.props.navigation.getParam('deck').cards
		};
	}
  
	play() {
		if(this.state.cards.length == 0)
		{
			Alert.alert(
				'Warning',
				'No cards in deck, add a card first',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{cancelable: false},
			)
		}
		else
		{
			this.props.navigation.navigate("Cards", {cards:this.state.cards, handleDeleteCard: card => this.deleteCard(card)});
		}
		
	}
	
	addCard() {
		this.props.navigation.navigate("AddCard" , {handleSubmit: card => this.saveAddedCardhere(card)});
	}
	
	deleteCard(card) {
		var newCards = []
		for(var i=0; i<this.state.cards.length; i++)
		{
			if(card.card.front != this.state.cards[i].front)
			{
				newCards = [...newCards, this.state.cards[i]]
			}
		}
		this.setState(
			{cards: newCards},
			()=>{
				this.props.navigation.getParam('handleDeleteCard')(this.state.cards, this.state.deck.name)
			}
		)
	}
	
	saveAddedCardhere(card)
	{
		var bool = true
		for(var i=0; i<this.state.cards.length; i++)
		{
			if(card.front == this.state.cards[i].front)
			{
				Alert.alert(
					'Alert card not added',
					'Card question already exists, try with another question',
					[
						{text: 'OK'},
					],
					{cancelable: false},
				);
				bool = false
			}
		}
		if(card.front == "")
		{
			Alert.alert(
				'Alert card not added',
				'Card question cannot be empty',
				[
					{text: 'OK'},
				],
				{cancelable: false},
			);
			bool = false
		}
		if(card.back == "")
		{
			Alert.alert(
				'Alert card not added',
				'Card answer cannot be empty',
				[
					{text: 'OK'},
				],
				{cancelable: false},
			);
			bool = false
		}
		if(bool == true)
		{
			const newCard = card
			const newCards = [...this.state.cards, newCard]
			this.setState({cards: newCards})
			Alert.alert(
				'Card',
				'Added',
				[
					{text: 'OK'},
				],
				{cancelable: false},
			);
			this.props.navigation.getParam('handleAddCard')(card, this.state.deck.name)
		}
	}
	
	
	render() {
		const { navigate } = this.props.navigation
		return(
			<View style = {styles.container}>
				<View style = {styles.deckCard}>
					<Text style={styles.deckTitle}>{this.state.deck.name}</Text>
					<Text style={styles.para}>Number of cards: {this.state.cards.length}</Text>
					<View style = {styles.btn}>
						<Button
							title = "Play"
							onPress = {() => this.play()}
							color = {lightgreen}
						></Button>
					</View>
					<View style = {styles.btn}>
						<Button
							title = "Add card"
							onPress = {() => this.addCard()}
							color = {lightgreen}
							
						></Button>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	deckTitle:{
		color: black,
		fontSize: 36,
		marginBottom: 20,
	},
	btn:{
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	},
	para:{
		fontSize:20,
		color: black,
		margin: 10,
	},
});
