import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Navigation from './components/Navigation';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/moviedetail/:id' element={<MovieDetail/>}/>

      </Routes>
    </div>
  );
}

export default App;
