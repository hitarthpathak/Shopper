import { useContext } from "react";
import { Context_API } from "../../App";
import Cart_List from "./sub-components/Cart_List";
import Cart_Amount from "./sub-components/Cart_Amount";

function Cart() {

    const { light_mode } = useContext(Context_API);

    return (

        <div className={`cart-box flex-grow h-full w-full m-auto ${light_mode ? "bg-gray-100" : "bg-gray-300 text-black"} flex items-start justify-between gap-10 p-10`}>

            <Cart_List />

            <Cart_Amount />

        </div>

    );

};

export default Cart;