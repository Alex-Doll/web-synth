import React, { useState } from 'react';
import { useTestRunner } from '../hooks/TestRunner';


function TestResults(props) {
  const { results, runTests } = useTestRunner(props.tests, props.handleSuccess, props.handleFailure);

  let resultItems = [];
  if (results.length === props.tests.length) {
    resultItems = results.map((result, index) => (
      <li key={index}><strong>{props.tests[index].name}</strong> - {props.tests[index].description}: <strong>{result ? 'PASSED' : 'FAILED'}</strong></li>
    ));
  }
  
  return (
    <div>
      <h4>Test Results:</h4>
      <ol>
        { resultItems }
      </ol>
      <button
        onClick={() => {
          runTests();
        }}
      >
        RUN TESTS
      </button>
    </div>
  );
}


export default TestResults;
