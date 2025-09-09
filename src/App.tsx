/*
  A search bar with autocomplete X
  Colored badges for the pokemon types (clicking on one leads to a list of pokemon with that type)
    For example, venosaur
      [grass] [poison]
       green  purple

  List of moves, clicking on move leads to list of pokemon who can learn that move
*/

import { Routes, Route } from "react-router-dom";

// Layout
import Header from "./components/layout/Header";

// Pages
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokmemonPage";
import TypePage from "./pages/TypePage";
import MovePage from "./pages/MovePage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <>
      <Header />
      <main className="responsive">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:name" element={<UserPage />} />
          <Route path="/pokemon/:name" element={<PokemonPage />} />
          <Route path="/types/:name" element={<TypePage />} />
          <Route path="/moves/:name" element={<MovePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
