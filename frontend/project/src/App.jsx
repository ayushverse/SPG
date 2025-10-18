import {Navigate,Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Singup.jsx";
import Home from "./pages/Home.jsx";
import {ToastContainer} from "react-toastify";
import RegisterStore from "./pages/RegisterStore.jsx";
import AddProducts from "./pages/AddProducts.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/signup"/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home/>} />
                <Route path="/register-store" element={<RegisterStore/>}/>
                <Route path="/add-product" element={<AddProducts/>}/>
            </Routes>
            <ToastContainer position="top-right" autoClose={1000} />
        </>
    );
}

export default App;