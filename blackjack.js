/**
 * Card Constructor - public
 * 
 * @param int s         suit of the card
 * @param int n         number ( rank ) of the card
 */
function Card( s, n ) {
    
    // Private suit & number variables
    var suit = s;
    var number = n;
    
    this.getSuit = function() {
        return suit;
    };
    
    this.getNumber = function() {
        return number;
    };
    
    /**
     * Gets the value of the card based on the number
     * @return int value    the value of the card
     */
    this.getValue = function() {

        // If the number is a face card give it a value of 10
        // If it's an ace, give it a value of 11
        // Otherwise it's value is simply it's number
        if ( number > 10 ) {
            return 10;
        } else if ( number === 1 ) {
            return 11;
        } else {
            return number;
        }
    };
}

/**
 * Generates a new card object with random suit and number
 *
 * @return object dealtCard     the card object, with a suit between 1 and 4
 *                              and number between 1 and 13
 */
function deal() {

    // Generate a random number between 1 and 4 for the suit, 
    // and a random number between 1 and 13 for the number
    var newSuit = Math.floor( Math.random() * 4 + 1 );
    var newNumber = Math.floor( Math.random() * 13 + 1 );

    return new Card( newSuit, newNumber );
}

/**
 * Hand constructor - private
 */
var Hand = function() {
    
    // Create two cards via the deal method
    var card1 = deal();
    var card2 = deal();

    // Initial hand array
    var newHand = [ card1, card2 ];
    
    this.getHand = function() {
        return newHand;
    };

    /**
     * Calculate the score of the hand via the getValue method
     *
     * @return int totalScore   the total score of the hand
     */
    this.score = function() {
        var totalScore = 0;
        var aces = 0;

        // Loop over the hand array
        for( var i = 0; i < newHand.length; i++ ) {
            // Check for aces
            if ( newHand[ i ].getValue() === 11 ) {
                aces += 1;
            }
            // Add the card's value to totalScore
            totalScore += newHand[ i ].getValue();
        }

        /* While the total is over 21 and there are aces present,
        change the value of an ace to 1 by subtracting 10 from 
        the score */
        while ( totalScore > 21 && aces > 0 ) {
            totalScore -= 10;
            aces -= 1;
        }

        return totalScore;
    };

    /**
     * Shows the user what the hand looks like
     * 
     * @return string handString    a text display of the cards in hand
     */
    this.printHand = function() {
        var handString = "";

        // Loop through each card in the hand, adding the suit & value to handString
        for( var i = 0; i < newHand.length; i++ ) {
            handString += ( newHand[ i ].getValue() + ", " + newHand[ i ].getSuit() );
        }

        return handString;
    };

    /**
     * Adds a card object to the hand array
     * 
     * @return array newHand    the hand plus a new card
     */
    this.hitMe = function() {
        var newCard = deal();
        return newHand.push( newCard );
    };
};

/**
 * Creates a hand for the dealer and hits until the score is above 17,
 * then returns the hand
 * 
 * @return object dealerHand    the dealer's hand
 */
function playAsDealer() {
    var dealerHand = new Hand();
    while( dealerHand.score() < 17 ) {
        dealerHand.hitMe();
    }
    return dealerHand;
}

/**
 * Creates a hand for the player, shows the player their hand and asks 
 * whether they would like to hit or stay until they choose to stay
 * 
 * @return object userHand    the player's hand
 */
function playAsUser() {
    var userHand = new Hand();
    var askHit = confirm( "In hand: " + userHand.printHand() + ". Would you like to hit? Press cancel to stay." );
    while( askHit ) {
        userHand.hitMe();
        askHit = confirm( "In hand: " + userHand.printHand() + ". Would you like to hit? Press cancel to stay." );
    }
    return userHand;
}

/**
 * Determines whether the player or dealer won based on their scores
 * 
 * @param  object userHand      the user's hand
 * @param  object dealerHand    the dealer's hand
 * @return string               game result declaration message
 */
function declareWinner( userHand, dealerHand ) {
    var win = "You win!";
    var lose = "You lose!";
    var tie = "You tied!";
    if ( userHand.score() > 21 ) {
        if ( dealerHand.score() > 21 ) {
            return tie;
        } else {
            return lose;
        }
    } else if ( dealerHand.score() > 21 ) {
        return win;
    } else if ( userHand.score() > dealerHand.score() ) {
        return win;
    } else if ( userHand.score() === dealerHand.score() ) {
        return tie;
    } else {
        return lose;
    }
}

/**
 * Gives the player and dealer each a hand and determines the winner.
 * 
 * @return void
 */
function playGame() {
    var player1 = playAsUser();
    var dealer1 = playAsDealer();
    console.log( declareWinner( player1, dealer1 ) );
}

playGame();