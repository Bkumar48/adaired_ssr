import React, { useState, useEffect } from "react";

const Others = () => {
  const [data, setData] = useState(null);
  useEffect(async () => {
   await  fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <div>This is the Another Page</div>
      <div>{data ? JSON.stringify(data) : "Loading..."}</div>
    </div>
  );
};

export default Others;
