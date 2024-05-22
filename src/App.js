import './App.css';
import {Routes,BrowserRouter,Route} from "react-router-dom";
import Home from './Pages/Home';
import Blog from './Pages/Blog';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/signup';
import AddBlog from './Pages/AddBlog';
import EditBlog from './Pages/EditBlog';
import UserProfile from './Pages/UserProfile';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer/>
    <Routes>
      <Route path='/dashboard' element={<Home/>}/>
      <Route path='/addBlog' element={<AddBlog/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/edit/:id' element={<EditBlog/>}/>
      <Route path="/profile/:username" element={<UserProfile />} />
      <Route path='*' element={<NotFound/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
