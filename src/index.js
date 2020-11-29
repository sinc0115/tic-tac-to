import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// IMAGES
import Federation from './images/Federation.svg'
import Borg from './images/Borg.svg'
import Picard from './images/Picard.svg'
import Locutus from './images/Locutus.svg'

let names = ['Federation', 'Borg', 'Picard', 'Locutus']

function PopUp(props) {
  return (
      <div className='pop-up'>
        <div className="pop-up-content">
          <h2>{props.message}</h2>
          {props.winner == 'Federation' && 
            <img src={require('./images/Picard.svg').default} alt="Picard" />
          }
          {props.winner == 'Borg' &&
            <img src={require('./images/Locutus.svg').default} alt="Locutus" />
          }
          <button onClick={props.handlePlayAgain}>Play Again</button>
        </div>
      </div>
  )
}


function Square (props) {
  return (
    <button
      className='square'
      onClick={props.onClick}
      // style={{background: 'url(/images/' + props.value + '.svg)'}}
    >
    {props.value && 
      <img src={require('./images/' + props.value + '.svg').default} alt={props.value} />
    }
    </button>
  )
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.starterState()
  } 
  
  // STARTER STATE
  starterState () {
    return {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      counter: 0
    }
  }

  reset() {
    this.setState(this.starterState())
  }
  // STARTER STATE ENDS

  // CLICK ON SQUARES
  handleClick (i) {
    const squares = this.state.squares.slice()

    if (this.state.winner || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? names[0] : names[1]

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: calculateWinner(squares),
      counter: this.state.counter + 1
    })
  }

  // SEND WINNER TO GAME COMPONENT
  componentDidUpdate(prevProps) {
    // console.log(prevProps.handleWinner)
    // console.log('winner: ' + this.state.winner)
    if (prevProps.handleWinner !== this.state.winner) {
      if (this.state.winner == names[0] || this.state.winner == names[1]) {
        this.props.handleWinner(this.state.winner)
        this.props.handleMessage(`The ${this.state.winner} wins!`)
        this.reset()
        // this.setState({winner: true})
        return
      } else if (this.state.counter === 9) {
        this.props.handleWinner(true)
        this.props.handleMessage('It\'s a tie!')
        this.reset()
      } else {
        return false
      }
    } else {
      return false
    }
    return false
  }

  // RENDER SQUARES
  renderSquare (i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} />
    )
  }

  render () {
    return (
      <div>
        <div className='status'>{this.state.winner ? 'Winner!' : 'Next Player: ' + (this.state.xIsNext ? 'Federation' : 'Borg')}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

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

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
