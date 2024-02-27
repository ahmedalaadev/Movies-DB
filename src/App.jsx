import { Container, Pagination } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import axios from "axios";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const getAllMovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=b2d098ea70e346b1b7705fd910353a2e&language=ar"
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };
  const getPage = async (page) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=b2d098ea70e346b1b7705fd910353a2e&language=ar&page=${page}`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };

  useEffect(() => {
    getAllMovies();
  }, []);
  console.log(movies);
  const search = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=52ef927bbeb21980cd91386a29403c78&query=${word}&language=ar`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  };
  return (
    <div className="font color-body ">
      <Container>
        <NavBar search={search} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MoviesList
                    movies={movies}
                    getPage={getPage}
                    pageCount={pageCount}
                  />
                </>
              }></Route>
            <Route path="/movie/:id" element={<MovieDetails />}></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
