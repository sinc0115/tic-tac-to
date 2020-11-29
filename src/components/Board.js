import React from 'react'
import '../index.css'

// NAMES ARRAY
let names = ['Federation', 'Borg']

// CALCULATE WINNER
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

// SQUARE
function Square (props) {
  return (
    <button
      className='square'
      onClick={props.onClick}
    >
    {props.value && 
      <img src={require('../images/' + props.value + '.svg').default} alt={props.value} />
    }
    </button>
  )
}

// BOARD
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
    if (prevProps.handleWinner !== this.state.winner) {
      if (this.state.winner == names[0] || this.state.winner == names[1]) {
        this.props.handleWinner(this.state.winner)
        this.props.handleMessage(`The ${this.state.winner} wins!`)
        this.reset()
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

    // RENDER BOARD
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

export default Board