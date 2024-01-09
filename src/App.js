import Home from "./components/Home/home.js";
import Post from "./components/Post/post.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
