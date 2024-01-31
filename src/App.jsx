import "./App.scss";
import { useEffect, useState } from "react";
import Layout from "./views/frontend/Layout/Index";
import SplashScreen from "./views/frontend/Components/SplashScreen/Index";
import { gsap, CSSPlugin, Expo } from "gsap";
gsap.registerPlugin(CSSPlugin);

function App() {
  return (
    <div className="app">
      <SplashScreen />
      <div className="content">
        {/* <Layout /> */}
      </div>
    </div>
  );
}

export default App;
