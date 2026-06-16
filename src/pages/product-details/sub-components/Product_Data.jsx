import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context_API } from "../../../App";
import Star_Icon from "/Star-Icon.png";
import Upper_Arrow from "/Upper-Arrow.jpg";
import Lower_Arrow from "/Lower-Arrow.jpg";

function Product_Data({ current_product }) {

    const { light_mode, is_logged_in, logged_in_user, set_logged_in_user, cart, set_cart, shopper_users, set_shopper_users } = useContext(Context_API);
    const navigate = useNavigate();

    const [quantity, set_quantity] = useState(Number(current_product.quantity));

    useEffect(() => {
        let product_in_cart = cart.find((item) => item.id == current_product.id);
        if (product_in_cart) {
            set_quantity(product_in_cart.quantity);
        }
    }, [cart]);

    let display_category = current_product.category.charAt(0).toUpperCase() + current_product.category.slice(1);

    let already_in_cart = cart.some((product) => {
        return (
            product.id === current_product.id
        );
    });

    function increase_quantity() {
        set_quantity((prev_quantity) => prev_quantity + 1);
        if (already_in_cart) {
            let updated_cart = cart.map((item) => {
                if (item.id === current_product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            set_cart(updated_cart);
            let updated_user = { ...logged_in_user, cart: updated_cart };
            set_logged_in_user(updated_user);
            let updated_users = shopper_users.map((user) =>
                user.e_mail === updated_user.e_mail ? updated_user : user
            );
            set_shopper_users(updated_users);
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
            localStorage.setItem("shopper-users", JSON.stringify(updated_users));
        }
    };

    function decrease_quantity() {
        if (quantity == 1) {
            return;
        };
        set_quantity((prev_quantity) => prev_quantity - 1);
        if (already_in_cart) {
            let updated_cart = cart.map((item) => {
                if (item.id === current_product.id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            set_cart(updated_cart);
            let updated_user = { ...logged_in_user, cart: updated_cart };
            set_logged_in_user(updated_user);
            let updated_users = shopper_users.map((user) =>
                user.e_mail === updated_user.e_mail ? updated_user : user
            );
            set_shopper_users(updated_users);
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
            localStorage.setItem("shopper-users", JSON.stringify(updated_users));
        }
    };

    function add_to_cart() {
        if (is_logged_in == false) {
            alert("Please Login First!");
            navigate("/login");
            return;
        };
        if (already_in_cart) {
            alert("Product Is Already in Cart!");
            return;
        };
        let new_cart = [...(logged_in_user.cart || []), { ...current_product, quantity }];
        set_cart(new_cart);
        let updated_user = { ...logged_in_user, cart: new_cart };
        set_logged_in_user(updated_user);
        let updated_users = shopper_users.map((user) =>
            user.e_mail === updated_user.e_mail ? updated_user : user
        );
        set_shopper_users(updated_users);
        localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
        localStorage.setItem("shopper-users", JSON.stringify(updated_users));
    };

    return (

        <div className={`product-data-box h-[auto] w-[70%] flex flex-col items-start justify-start gap-5 ${light_mode ? "text-black" : "text-black"}`}>

            <h1 className="text-red-500">{display_category.toUpperCase()}</h1>

            <b><h1 className="text-3xl">{current_product.product_name.toUpperCase()}</h1></b>

            <div className="h-6 w-auto flex align-center justify-center gap-2">

                <div className="h-full w-auto p-0.5 flex align-center justify-center gap-1">

                    <img className="star-icon h-full" src={Star_Icon} alt="Image Not Available" />

                    <img className="star-icon h-full" src={Star_Icon} alt="Image Not Available" />

                    <img className="star-icon h-full" src={Star_Icon} alt="Image Not Available" />

                </div>

                <p className="h-full w-auto">By {current_product.seller_name}</p>

            </div>

            <p className="h-auto w-auto">{current_product.product_description}</p>

            <div className="rounded-2xl h-auto w-full p-5 space-y-3 bg-white shadow-xl">

                <div className="h-auto w-full flex items-center justify-between">

                    <span className="text-lg font-semibold text-slate-950">${current_product.new_price}</span>

                    <span className="line-through text-slate-500 text-sm">${current_product.old_price}</span>

                </div>

                <div className="h-1 w-full rounded-full bg-slate-200">

                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />

                </div>

            </div>

            <div className="rounded-2xl h-auto w-full p-5 space-y-3 bg-white shadow-xl">

                <p className="font-semibold">Quantity :</p>

                <div className="border border-slate-300 rounded-2xl bg-slate-50 p-1 inline-flex items-center justify-center">

                    <button className="rounded-full h-auto w-auto px-3 py-2 hover:bg-slate-100" onClick={decrease_quantity}>−</button>

                    <input className="outline-none rounded-full h-auto w-13 px-3 py-2 text-center font-semibold" type="number" value={quantity} readOnly={true} />

                    <button className="rounded-full h-auto w-auto px-3 py-2 hover:bg-slate-100" onClick={increase_quantity}>+</button>

                </div>

            </div>

            <button className="add-to-cart-button rounded-2xl h-auto w-full m-auto p-2 text-white bg-gradient-to-r from-rose-500 to-violet-500 hover:bg-red-600 transition hover:-translate-y-1 hover:shadow-xl" onClick={add_to_cart}>{already_in_cart ? "Added To Cart" : "Add To Cart"}</button>

        </div>

    );

};

export default Product_Data;