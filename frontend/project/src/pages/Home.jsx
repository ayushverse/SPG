import Logout from "../components/Logout.jsx";
import Register from "../components/Register.jsx";
import InventoryButton from "../components/InventoryButton.jsx";

function Home() {
    return (
        <div>
            <Logout />
            <Register/>
            <InventoryButton/>
        </div>
    );
}

export default Home;