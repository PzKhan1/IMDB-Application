import './App.css';
import Home from './pages/Home';
import WatchList from './pages/WatchList';
import NavBar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import MovieContextWrapper from './context/MovieContext';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return <Provider store={store}>
    <MovieContextWrapper>
      <NavBar />
      <Routes>
        <Route
          path="/" element={<Home />}
        />
        <Route
          path="/watchlist"
          element={<WatchList />}
        />
      </Routes>
    </MovieContextWrapper>

  </Provider>
}
export default App;