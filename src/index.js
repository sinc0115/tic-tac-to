import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function PopUp() {
  return (
      <div className='pop-up'>
        <div className="pop-up-content">
          <h2>This is a PopUp!</h2>
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
      winner: null,
      gameOver: this.props.gameOver
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

  // componentDidUpdate() {
  //   switch (this.state.winner) {
  //     case 'x':
  //       this.setState({gameOver: true})
  //       break
  //     case 'O':
  //       this.setState({gameOver: true})
  //       break
  //   }
  // }

  // GAME OVER IS A PROP COMPARE STATE TO PROP ABOVE!
  // SET WINNER TO PROP GAMEOVER!

  componentDidUpdate(prevProps) {
    console.log(prevProps.handleWinner)
    console.log('winner: ' + this.state.winner)
    if (prevProps.handleWinner !== this.state.winner) {
      if (this.state.winner == 'X') {
        console.log('X')
        this.props.handleWinner(this.state.winner)
        this.setState({winner: null})
        return false
      } else if (this.state.winner == 'O') {
        console.log('O')
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

  // handleChange () {
  //   console.log('change')
  // }

  render () {
    return (
      <div>
        <div className='status'>{this.state.winner ? 'Winner: ' + this.state.winner : 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')}</div>
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
      gameOver: false,
      winner: null
    }

    this.handleWinner = this.handleWinner.bind(this)
  }

  handleWinner(x) {
    console.log(x)
    this.setState({winner: x})
    return false
  }
  
  render () {
    return (
      <div className="container">
        <h1>Trek Tac Toe</h1>
        <div className='game'>
          <div className='game-board'>
            <Board gameOver={this.state.gameOver} handleWinner={this.handleWinner} />
          </div>
        </div>
        {/* <PopUp /> */}
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
