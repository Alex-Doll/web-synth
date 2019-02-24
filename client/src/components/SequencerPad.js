import React from 'react';

function SequencerPad(props) {
  return (
    <div
      onClick={props.handleClick}
      style={{
        backgroundColor: props.checked ? '#22adc2' : '#f3f3f3',
        height: '30px',
        width: '100%',
        border: `2px solid ${props.isPlaying && props.sequencerOn ? '#f35c9f' : 'transparent'}`,
      }}>
    </div>
  );
}

export default SequencerPad;
