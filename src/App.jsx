import { BrowserRouter, Route, Routes } from "react-router-dom";
import Article from "./assets/article.jsx";
import Home from "./assets/home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/news/:id" element={<Article />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
