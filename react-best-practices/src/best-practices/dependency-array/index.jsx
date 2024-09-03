// Anything you use in your effect callback that won't trigger a re-render when updated should not go into the dependency array.

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

var x = "";
const obj = {};
function DependencyArray() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const scoreRef = useRef(0);

  // useEffect(() => {}, [dispatch]); // 🫣

  if (!x) {
    x = dispatch;  // dispatch identity always same so you don't pass dispatch in useEffect dependency
                  // becuase redux managed itself dispatch and it's identity preservedValue between multiple re-renders
  }

  console.log(dispatch === x);

  // if you change instance 
  // const handleScore = useCallback(() => {
  //   scoreRef.current = scoreRef.current + 1;
  //   console.log(scoreRef.current);
  // }, []);

  useEffect(() => {
    console.log("useEffect");
    // handleScore();
  }, [scoreRef.current]); // 😁

  // UseEffect check to internally dependency from Object.is() so it check/compare to prev and next value
  // and second things is useEffect accept primitive data type in an dependencies and if you passed an
  // object in an dependency then it will be re-rendered becuase Object is a non-primitive data type
  // Object.is() worked to similar from === and two key difference between Object.is() and ===
  // Object.is() could be compare to 0, -0 while === can't and Object/is() also compare to NaN, NaN
  // while === can't

  function handleState() {
    setCount(count + 1);
  }

  function handleScore() {
    scoreRef.current = scoreRef.current + 1;
    console.log(scoreRef.current);
  }

  function logToServer() {
    console.log(" logToServerFunction called");
  }

  function logToSentry() {
    console.log(" logToServerFunction called", score);
  }

  return (
    <div>
      <button onClick={handleState}>Increase Count by State</button>
      <button onClick={handleScore}>Increase Count by Ref</button>
    </div>
  );
}

export default DependencyArray;
