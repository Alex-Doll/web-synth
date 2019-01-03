import React from 'react';

function SequencerPad(props) {
  // The pink color: #f35c9f
  return (
    <div
      onClick={props.handleClick}
      style={{
        backgroundColor: props.checked ? '#22adc2' : '#f3f3f3',
        height: '30px',
        width: '100%',
        border: '2px solid #f3f3f3',
      }}>
    </div>
  );
}

export default SequencerPad;
