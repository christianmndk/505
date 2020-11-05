// to do:
// connect with server
// write to server
// read from server
// Select cards functionality
// play cards to server
// add turn functionality
// add joker functionality


// used to construct errors with a name and message
class error {
	constructor(name, message) {
		this.name = name;
		this.message = message;
	}
}

TOOMANYPLAYERS = new error("TOOMANYPLAYERS", "Not enough cards for everyone!\n" +
											 "Lower the amount of players or\n" +
											 "Lower the starting card amount")

// a card object
// holds information about type and value and how many points it is worth
class card {
	constructor(points, type, value) {
		this.points = points;
		this.type = type;
		this.value = value;
	}
}

// the deck object
// holds all the non player held cards in to seperate stacks
// the deck is shuffeled upon inititation and can be shuffeled again
class deck {
	constructor(jokerAmount) {
		this.types = {
			spade   : 1,
			heart   : 2,
			diamond : 3,
			clover  : 4,
			joker   : 5
		}

		this.stack = [];
		this.front = [];
		
		// creates all 52 normal cards and jokerAmount of joker cards
		// and then shuffels them all together
		for (i=1; i<5; i++) {
			let type = i;
			this.stack.push(new card(15, type, 0));
			for (i=1; i<9; i++) {
				this.stack.push(new card(5, type, i));
			}
			for (i=9; i<13; i++) {
				this.stack.push(new card(10, type, i));
			}
		}
		for (i=0; i<jokerAmount; i++) {
			this.stack.push(new card(25, this.types.joker, 13));
		}

		shuffle(this.stack);
	}

	// shuffels all the cards in the stack
	shuffleDeck() {
		shuffle(this.stack);
	}
}

class hand {
	constructor(cards) {
		this.cards = cards;
	}

	points() {
		let points = 0;
		this.cards.forEach(card => {
			points += card.points;
		});
		return points;
	} 
}

class player {
	constructor() {
		this.hand = [];
		this.selectedCards
		this.playedCards = [];
		this.points = 0;
		this.mustPutCardDown = false;
		this.game = false;
	}

	drawFromStack(drawCount, aDeck) {
		if (drawCount > aDeck.stack.length)
			return false;
		for (i=0; i<drawCount; i++) {
			this.hand.push(aDeck.stack.pop());
			return true;
		}
	}

	drawFromFront(drawCount, aDeck) {
		if (drawCount > aDeck.front.length)
			return false;
		for (i=0; i<drawCount; i++) {
			this.hand.push(aDeck.front.pop());
			return true;
		}
	}

	takeWholeFront() {
		this.mustPutCardDown = true;
		return drawFromFront(this.game.deck.front.length, this.game.deck);
	}

	takeSingleFront() {
		return drawFromFront(1, this.game.deck);
	}

	takeSingleStack() {
		return drawFromStack(1, this.game.deck);
	}

	drawStartingCards() {
		return drawFromStack(this.game.startingCardsAmount, this.game.deck);
	}

	playCards() {
		// It must have a length that is greater than 0
		if (!this.selectedCards.length || this.selectedCards.length == 0) {
			return false
		}

		// we can only play one type of card at once and they must be sequential
		let type = this.selectedCards[0].type;
		let sumValue = 0;
		let highestValue = 15
		this.selectedCards.forEach(card => {
			if (card.type != type) {
				return false;
			}
			sumValue += card.value;
			if (card.value > highestValue) {
				highestValue = card.value;
			}
		});

		// check if they are all after each other with some math 
		let sequensValue = (highestValue * (highestValue + 1)  
		- (highestValue - this.selectedCards.length) 
		* (highestValue - this.selectedCards.length + 1) ) / 2;
		if (sumValue != sequensValue) {
			return false
		}

		// check if we are putting cards down to match with other cards already
		// on the table
		// need stealing joker functionality
		if (this.selectedCards.length = 1) {
			this.game.table.playedCards.forEach(card => {
				// check if it comes before or after modulus 14 (wrap around)
				if (this.selectedCards[0].value == (card.value + 1) % 14 || this.selectedCards[0].value == (card.value - 1) % 14) {
					return true;
				}
			});
			return false;
		}
		// we do almost the same thing but for 2 cards
		else if (this.selectedCards.length = 2) {
			let match = false;
			this.selectedCards.forEach({})
			this.game.table.playedCards.forEach(card => {
				// check if it comes before or after modulus 14 (wrap around)
				if (this.selectedCards[0].value == (card.value + 1) % 14 || this.selectedCards[0].value == (card.value - 1) % 14) {
					return true;
				}
			if (match == true) {
		
			});
		}

		else {

		}

		// 
	}
}

class table {
	constructor(playerCount) {
		this.playerCount = playerCount;
		this.playedCards = []
	}
}

class game {
	constructor(players = [], jokerAmount = 0, winningPoints = 500, startingCardsAmount = 7) {
		this.deck = new deck(jokerAmount) ;
		this.players = players;
		this.table = new table(this.players.length);
		this.winningPoints = winningPoints;
		this.startingCardsAmount = startingCardsAmount
	}

	// check if any player has gotten the necesary amount of points
	checkIfWon() {
		winner = {points : 0};
		this.players.forEach(player, index => {
			if (player.points > this.winningPoints && player.points > winner.points) {
				return winner;
			}
		});
	}

	// should a new player, that joins the game the next round
	addPlayer() {

	}

	// add new players
	// reset table player count
	// create new deck and shuffle
	// start first player
	startNewRound() {

	}

	// tally points
	// check if someone has won the game
	// empty everyone's hands and played cards
	endRound() {

	}

}