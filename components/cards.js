//cards.js
import React from 'react'
import {StyleSheet, Text, View, Button, Alert} from 'react-native'
import {lightgreen, yellow, black, white} from '../utilities/colors'
import {createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


export class Cards extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDoCards: this.getToDoCards(),
			correctCards: [],
			incorrectCards: [],
			iterator: 0,
			time: 0
		};
	}
	
	getToDoCards(){
		const cards = this.props.navigation.getParam('cards')
		var newtoDoCards = []
		for(var i=0; i<cards.length; i++)
		{
			newtoDoCards = [...newtoDoCards, {card: cards[i], time: 0}]
		}
		return newtoDoCards
	}
	
	showAnswer(card, hours, min, sec){
		const newhours = new Date().getHours();
		const newmin = new Date().getMinutes();
		const newsec = new Date().getSeconds();
		const tothours = (newhours-hours)
		const totmin = (newmin-min)
		const totsec = (newsec-sec)
		const newTime = (tothours*3600 + totmin*60 + totsec)
		this.setState (
			{time: newTime}, 
			()=>
			{
				this.props.navigation.navigate(
					"CardAnswer", 
					{
						card: card, 
						onStartAgain: ()=>this.startAgain(),
						onCorrect: ()=>this.correctCard(card),
						onIncorrect: ()=>this.incorrectCard(card),
						onDeleteCard: ()=>this.deleteCard(card),
					}
				)
			}
		)
		
	}
	
	deleteCard(card){
		Alert.alert(
			'Warning',
			'Are you sure?',
			[
				{text: 'YES', onPress: ()=> {
					this.props.navigation.getParam('handleDeleteCard')(card)
					const newIterator = this.state.iterator + 1
					if(newIterator == this.state.toDoCards.length)
					{
						this.props.navigation.navigate("SelDeck")
					}
					else{
						this.setState(
							{iterator: newIterator}, 
							()=>{
								this.props.navigation.navigate("CardQuestion")
							}
						)
					}
				}},
				{text: 'NO'},
			],
			{cancelable: false},
		);
	}
	
	correctCard(card){
		const time = this.state.time
		const newCard = {card: card.card , time: time}
		const newCardList = [...this.state.correctCards, newCard]
		const sortedCardList = newCardList.sort(function(a,b){return (a.time-b.time)})
		this.setState({ 
			correctCards: sortedCardList.reverse(),
			}, 
			()=> {				
				if((this.state.iterator+1)==(this.state.toDoCards.length))
				{
					const newIterator = this.state.iterator + 2
					this.setState({iterator: newIterator})
					this.loopCards()
				}
				else
				{
					const newIterator = this.state.iterator + 1
					this.setState({iterator: newIterator})
					this.props.navigation.navigate("CardQuestion")
				}
			}
		)
	}
	
	incorrectCard(card){
		const time = this.state.time
		const newCard = {card: card.card , time: time}
		const newCardList = [...this.state.incorrectCards, newCard]
		const sortedCardList = newCardList.sort(function(a,b){return (a.time-b.time)})
		this.setState({ 
			incorrectCards: sortedCardList.reverse(),
			}, 
			()=>{
				if((this.state.iterator+1)==(this.state.toDoCards.length))
				{
					const newIterator = this.state.iterator + 2
					this.setState({iterator: newIterator})
					this.loopCards()
				}
				else
				{
					const newIterator = this.state.iterator + 1
					this.setState({iterator: newIterator})
					this.props.navigation.navigate("CardQuestion")
				}
			}
		)
	}
	
	loopCards(){
		const newCardList = [...this.state.incorrectCards, ...this.state.correctCards]
		this.setState({ 
			toDoCards: newCardList,
			incorrectCards: [],
			correctCards: [],
			iterator: 0,
			}, 
			()=> {
				this.props.navigation.navigate("CardQuestion")
			}
		)
	}
	
	startAgain(){
		const newtoDoCards = this.state.toDoCards.slice(this.state.iterator, this.state.toDoCards.length)
		const newCardList = [...this.state.incorrectCards, ...newtoDoCards, ...this.state.correctCards]
		this.setState({ 
			toDoCards: newCardList,
			incorrectCards: [],
			correctCards: [],
			iterator: 0,
			}, 
			()=> {
				this.props.navigation.navigate("CardQuestion")
			}
		)
	}
	
	render(){
		const hours = new Date().getHours();
		const min = new Date().getMinutes();
		const sec = new Date().getSeconds();
		const card = this.state.toDoCards[this.state.iterator]
		const { navigate } = this.props.navigation
		return(
			<Question
				card= {card}
				iterator= {this.state.iterator}
				onShowAnswer= {() => this.showAnswer(card, hours, min, sec)}
				onStartAgain= {() => this.startAgain()}
			/>
		)
	}
	
}

const Question = props => (
	<View style = {styles.container}>
		<View style = {styles.card}>
			<Text style = {styles.qa}>Question:</Text>
			<Text style = {styles.para}>{props.card.card.front}</Text>
			<View style = {styles.btn}>
				<Button
					color= {lightgreen}
					title = "show Answer"
					onPress = {props.onShowAnswer}
				></Button>
			</View>
			<View style = {styles.btn}>
				<Button
					color= {lightgreen}
					title = "start again"
					onPress = {props.onStartAgain}
				></Button>
			</View>
		</View>
	</View>
)

Question.navigationOptions = {title: "CardQuestion"}

const Answer = props => (
	<View style = {styles.container}>
		<View style = {styles.card}>
			<Text style = {styles.qa}>Answer:</Text>
			<Text style = {styles.para}>{props.navigation.state.params.card.card.back}</Text>
			<View style = {styles.btn}>
				<Button
					color= {lightgreen}
					title = "Right"
					onPress = {props.navigation.state.params.onCorrect}
				></Button>
			</View>
			<View style = {styles.btn}>
				<Button
					color= {lightgreen}
					title = "Wrong"
					onPress = {props.navigation.state.params.onIncorrect}
				></Button>
			</View>
			<View style = {styles.btn}>
				<Button
					color= {lightgreen}
					title = "Start again"
					onPress = {props.navigation.state.params.onStartAgain}
				></Button>
			</View>
			<View style = {styles.btn}>
				<Button
					color= {lightgreen}
					title = "Delete card"
					onPress = {props.navigation.state.params.onDeleteCard}
					//se clicco deve fare un alert e chiedere se sono sicuro, se si chiama il metodo di decklist addcard
				></Button>
			</View>
		</View>
	</View>
)

Answer.navigationOptions = {title: "CardAnswer"}

const routes = {
	CardQuestion:{screen: Cards},
	CardAnswer:{screen: Answer}
}

const options ={
	headerMode: 'none',
	initialRoutName:'CardQuestion',
}

const CardsAppNavigator = createStackNavigator(routes,options)

export default CardsAppNavigator


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: white,
		padding: 35,
	},
	card:{
		flex:1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: yellow,
		borderRadius: 10,
		width: 300,
		margin: 8,
	},
	qa:{
		fontWeight: 'bold',
		fontSize:20,
		color: black,
		margin:10,
	},
	para:{
		fontSize:15,
		color: black,
		margin: 10,
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	},
});
