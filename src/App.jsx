import "./App.scss";
import Layout from "./views/frontend/Layout/Index";
import { StaticRouter } from "react-router-dom/server";

function App() {
  return (
    <>
      <StaticRouter>
        <Layout />
      </StaticRouter>
    </>
  );
}

export default App;
