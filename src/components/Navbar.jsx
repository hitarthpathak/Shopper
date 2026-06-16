import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Context_API } from "../App";
import Icon from "/Icon.jpg";
import Cart_Icon from "/Cart.jpg";
import User_Icon from "/User.png";

function Navbar() {

    const { light_mode, set_light_mode, is_logged_in, set_is_logged_in, set_logged_in_user, cart } = useContext(Context_API);
    const navigate = useNavigate();

    function theme_toggle() {
        set_light_mode((previous_mode) => {
            return !previous_mode;
        });
    };

    function log_out() {
        set_is_logged_in(false);
        set_logged_in_user({});
        localStorage.setItem("shopper-login-status", "false");
        localStorage.removeItem("shopper-logged-in-user");
        navigate("/");
    };

    return (

        <div className={`navbar h-20 w-full px-5 flex items-center justify-between sticky top-0 z-50 ${light_mode ? "bg-white text-black" : "bg-black text-white"}`}>

            <Link to={"/"}>

                <div className="icon-box h-full w-auto flex items-center justify-center gap-5">

                    <img className="icon h-14" src={Icon} alt="Image Not Available" />

                    <span>SHOPPER</span>

                </div>

            </Link>

            <ul className="nav-links h-full w-auto flex items-center justify-center gap-12">

                <NavLink to={"/men-category"} className={({ isActive }) => isActive ? "text-red-700 font-bold" : "text-black-700"}>

                    <li className="nav-link h-full w-auto flex items-center justify-center hover:underline">MEN</li>

                </NavLink>

                <NavLink to={"/women-category"} className={({ isActive }) => isActive ? "text-red-700 font-bold" : "text-black-700"}>

                    <li className="nav-link h-full w-auto flex items-center justify-center hover:underline">WOMEN</li>

                </NavLink>

                <NavLink to={"/kids-category"} className={({ isActive }) => isActive ? "text-red-700 font-bold" : "text-black-700"}>

                    <li className="nav-link h-full w-auto flex items-center justify-center hover:underline">KIDS</li>

                </NavLink>

            </ul>

            <div className="toggle-box h-full w-auto flex items-center justify-center">

                <div className={`toggle-button rounded-full h-7 w-14 p-1 flex items-center ${light_mode ? "justify-start bg-blue-700" : "justify-end bg-white"} cursor-pointer`} onClick={theme_toggle}>

                    <div className={`toggle rounded-full h-5 w-5 ${light_mode ? "bg-white" : "bg-blue-700"} `}></div>

                </div>

            </div>

            <div className="h-full w-auto flex items-center justify-center">

                <Link to={"/cart"}>

                    <div className="cart-box h-full w-auto flex items-center justify-center">

                        <img className="cart-icon rounded-full h-14 cursor-pointer" src={Cart_Icon} alt="Image Not Available" />

                        <span className="cart-count rounded-full h-5 w-5 flex items-center justify-center relative right-5 bottom-3 bg-red-500 text-white">{cart.length}</span>

                    </div>

                </Link>

                {

                    is_logged_in

                        ?

                        (

                            <button className="log-out-button rounded-lg m-auto mt-5 p-2 bg-red-500 hover:bg-red-600" onClick={log_out}>Log Out</button>

                        )

                        :

                        (

                            <Link to={"/login"}>

                                <div className="login-box h-full w-auto flex items-center justify-center">

                                    <img className="user-icon h-10 cursor-pointer" src={User_Icon} alt="Image Not Available" />

                                </div>

                            </Link>

                        )

                }

            </div>

        </div >

    );

};

export default Navbar;