// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// import App from './App'

// export function render() {
//   const html = ReactDOMServer.renderToString(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   )
//   return { html }
// }
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Router } from "./router";

export const render = ({ path }) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <Router />
    </StaticRouter>
  );
};
