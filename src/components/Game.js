import React from 'react'
import '../index.css'

import PopUp from './PopUp'
import Board from './Board'

// GAME
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: null,
      message: ''
    }

    this.handleWinner = this.handleWinner.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
    this.handlePlayAgain = this.handlePlayAgain.bind(this)
  }

  handleWinner(winner) {
    console.log(winner)
    this.setState({winner: winner})
    return false
  }

  handleMessage(message) {
    this.setState({message: message})
    return
  }

  handlePlayAgain() {
    console.log('play again')
    this.setState({winner: null})
    return
  }
  
  render () {
    return (
      <div className="container">
        <h1>Trek Tac Toe</h1>
        <div className='game'>
          <div className='game-board'>
            <Board handleWinner={this.handleWinner} handleMessage={this.handleMessage} />
          </div>
        </div>
        {this.state.winner &&
          <PopUp winner={this.state.winner} handlePlayAgain={this.handlePlayAgain} message={this.state.message} />
        }
      </div>
    )
  }
}

export default Game