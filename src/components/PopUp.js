import React from 'react'
import '../index.css'

function FederationWins() {
  return (
    <div>
      <p>"Make it so!"</p>
      <img src={require('../images/Picard.svg').default} alt="Picard" />
    </div>
  )
}

function BorgWins() {
  return (
    <div>
      <p>"We are the Borg. You will be assimilated. Resistance is futile."</p>
      <img src={require('../images/Locutus.svg').default} alt="Locutus" />
    </div>
  )
}


function PopUp(props) {
  return (
      <div className='pop-up'>
        <div className="pop-up-content">
          <h2>{props.message}</h2>
          {props.winner == 'Federation' && 
            <FederationWins />
          }
          {props.winner == 'Borg' &&
            <BorgWins />
          }
          <button onClick={props.handlePlayAgain}>Play Again</button>
        </div>
      </div>
  )
}

export default PopUp