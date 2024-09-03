import { useEffect, useState } from "react";

/*
 1. Did you cancel it?
*/

function FetchData() {
  const [data, setData] = useState(null);

  function startFetching() {}

  useEffect(() => {
    setInterval(() => {
      console.log("here");
      fetch("https://reqres.in/api/users?page=2").then((d) => {
        setData(d);
      });
    }, 1000);
  }, []);

  return (
    <div className="card green">
      <h1>💽 Fetching Data</h1>
      {!data && <h4>{data}</h4>}
    </div>
  );
}

// function fetch() {
//   return new Promise((res) => {
//     setTimeout(() => {
//       res("Data From Server");
//     }, 3000);
//   });
// }

export default FetchData;


// For API CALLED

// Suspense ReactJS 18
// React Router v6.25 or 6.something
// React Query
// SWR