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
      const result = test.func();
      newResults[index] = result;
    });
    setResults(newResults);
  }

  useEffect(() => {
    setResults(new Array(tests.length).fill(false));
  }, [tests]);

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
