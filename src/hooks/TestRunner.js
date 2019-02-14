import { useState, useEffect } from 'react';

export function useTestRunner(
  tests = [],
  onSuccess = () => console.log('No Success Callback'),
  onFailure = () => console.log('No Failure Callback'),
) {
  const [results, setResults] = useState(new Array(tests.length).fill(false));

  function runTests() {
    let newResults = [...results];
    tests.forEach((test, index) => {
      const result = test();
      newResults[index] = result;
    });
    setResults(newResults);
  }

  useEffect(() => {
    if (results.every((result) => result)) {
      onSuccess();
    }
    else {
      onFailure();
    }
  }, [results]);

  return { results, runTests };
}
