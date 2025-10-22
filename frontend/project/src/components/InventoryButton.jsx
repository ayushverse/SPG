import {useNavigate} from "react-router-dom";

function InventoryButton() {
    const naviagte = useNavigate()
    return (
        <div>
            <button onClick={() => naviagte(`/store-inventory`)} className="cursor-pointer bg-red-500 rounded-xl p-3 m-2 text-white hover:bg-red-600">
                View inventory
            </button>

        </div>
    );
}

export default InventoryButton;