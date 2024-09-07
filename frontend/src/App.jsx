import "./App.css";

import SleepTrackerAppBar from "./components/SleepTrackerAppBar";
import { SleepDataContextProvider } from "./context/SleepDataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SleepHistory } from "./pages/SleepHistory";
import { Metrics } from "./pages/Metrics";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <SleepTrackerAppBar />
        {/* <SleepDataContextProvider> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<SleepHistory />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
        {/* </SleepDataContextProvider> */}
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
