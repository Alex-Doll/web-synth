import { useState, useEffect } from 'react';

export function useTestRunner(
  tests = [],
  onSuccess = () => console.log('No Success Callback'),
  onFailure = () => console.log('No Failure Callback'),
) {
  const [results, setResults] = useState(new Array(tests.length).fill(false));

  // Implementation of getDerivedStateFromProps (see if it can be refactored)
  const [prevTests, setPrevTests] = useState(tests);
  if (prevTests !== tests) {
    const updatedResults = new Array(tests.length).fill(false);
    setResults(updatedResults);
    setPrevTests(tests);
    return { results: updatedResults, runTests };
  }

  function runTests() {
    let newResults = [...results];
    tests.forEach((test, index) => {
      const result = test.func();
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
