import React from 'react';

function StepSequencer(props) {
  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'row'}} >
        <p>Note: </p>
        <input type='checkbox' onChange={() => props.handlePadChange(0, 'note')} checked={props.note[0]} />
        <input type='checkbox' onChange={() => props.handlePadChange(1, 'note')} checked={props.note[1]} />
        <input type='checkbox' onChange={() => props.handlePadChange(2, 'note')} checked={props.note[2]} />
        <input type='checkbox' onChange={() => props.handlePadChange(3, 'note')} checked={props.note[3]} />
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}} >
        <p>OscNote: </p>
        <input type='checkbox' onChange={() => props.handlePadChange(0, 'oscNote')} checked={props.oscNote[0]} />
        <input type='checkbox' onChange={() => props.handlePadChange(1, 'oscNote')} checked={props.oscNote[1]} />
        <input type='checkbox' onChange={() => props.handlePadChange(2, 'oscNote')} checked={props.oscNote[2]} />
        <input type='checkbox' onChange={() => props.handlePadChange(3, 'oscNote')} checked={props.oscNote[3]} />
      </div>
    </div>
  );
}

export default StepSequencer;
