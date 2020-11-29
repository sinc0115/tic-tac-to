import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function PopUp(props) {
  return (
      <div className='pop-up'>
        <div className="pop-up-content">
          <h2>The winner is: </h2>
          <p>{props.winner}</p>
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
    >
      {props.value}
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
      winner: null
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

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: calculateWinner(squares)
    })
  }

  // SEND WINNER TO GAME COMPONENT
  componentDidUpdate(prevProps) {
    console.log(prevProps.handleWinner)
    console.log('winner: ' + this.state.winner)
    if (prevProps.handleWinner !== this.state.winner) {
      if (this.state.winner == 'X' || this.state.winner == 'O') {
        console.log('X')
        this.props.handleWinner(this.state.winner)
        this.reset()
        // this.setState({winner: true})
        return
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
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render () {
    return (
      <div>
        <div className='status'>{this.state.winner ? 'Winner!' : 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')}</div>
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
      winner: null
    }

    this.handleWinner = this.handleWinner.bind(this)
    this.handlePlayAgain = this.handlePlayAgain.bind(this)
  }

  handleWinner(winner) {
    console.log(winner)
    this.setState({winner: winner})
    return false
  }

  handlePlayAgain() {
    console.log('play again')
    this.setState({winner: null})
  }
  
  render () {
    return (
      <div className="container">
        <h1>Trek Tac Toe</h1>
        <div className='game'>
          <div className='game-board'>
            <Board handleWinner={this.handleWinner} />
          </div>
        </div>
        {this.state.winner && 
          <PopUp winner={this.state.winner} handlePlayAgain={this.handlePlayAgain} />
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
