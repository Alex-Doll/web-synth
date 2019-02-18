import React from 'react';



function TestResults(props) {

  const resultItems = props.results.map((result, index) => (
    <li key={index}><strong>{props.tests[index].name}</strong> - {props.tests[index].description}: <strong>{result ? 'PASSED' : 'FAILED'}</strong></li>
  ));
  
  return (
    <div>
      <h4>Test Results:</h4>
      <ol>
        { resultItems }
      </ol>
    </div>
  );
}


export default TestResults;
