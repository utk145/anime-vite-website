import { BrowserRouter, Route, Routes } from "react-router-dom";
import Anime from "./components/Anime";
import CharcImages from "./components/CharcImages";
import Home from "./components/Home";
import Popular from "./components/Popular";
import "./styles.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/anime/:id" element={<Anime/>}/>
        <Route path="/character/:id" element={<CharcImages/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
