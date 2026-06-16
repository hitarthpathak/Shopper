import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context_API } from "../../../App";
import Upper_Arrow from "/Upper-Arrow.jpg";
import Lower_Arrow from "/Lower-Arrow.jpg";

function Cart_List() {

    const { light_mode, cart, set_cart, logged_in_user, set_logged_in_user, shopper_users, set_shopper_users } = useContext(Context_API);

    function update_cart(new_cart) {
        set_cart(new_cart);
        if (logged_in_user) {
            let updated_user = { ...logged_in_user, cart: new_cart };
            set_logged_in_user(updated_user);
            let updated_users = shopper_users.map((user) =>
                user.e_mail == updated_user.e_mail ? updated_user : user
            );
            set_shopper_users(updated_users);
            localStorage.setItem("shopper-logged-in-user", JSON.stringify(updated_user));
            localStorage.setItem("shopper-users", JSON.stringify(updated_users));
        }
    };

    function increase_quantity(product_id) {
        let new_cart = cart.map((item) =>
            item.id == product_id ? { ...item, quantity: Number(item.quantity) + 1 } : item
        );
        update_cart(new_cart);
    };

    function decrease_quantity(product_id) {
        let new_cart = cart.map((item) =>
            item.id == product_id
                ? { ...item, quantity: Number(item.quantity) > 1 ? Number(item.quantity) - 1 : 1 }
                : item
        );
        update_cart(new_cart);
    };

    function remove_product(product_id) {
        let new_cart = cart.filter(item => item.id != product_id);
        update_cart(new_cart);
    };

    return (

        <div className="cart-list h-auto w-[60%] flex flex-col items-stretch justify-center gap-3">

            <h1 className="text-3xl mb-5">Cart Items</h1>

            {

                cart.length === 0

                    ?

                    (

                        <div className="product-box rounded-lg bg-white p-12 h-auto w-full flex items-center justify-center shadow-xl">

                            <h1 className="empty-cart">Cart Is Empty!</h1>

                        </div>

                    )

                    :

                    (

                        cart.map((product) => (

                            <div className="product-box rounded-lg bg-white p-3 h-auto w-full flex items-center justify-center shadow-xl" key={product.id}>

                                <div className="border border-white product-image-box rounded-lg h-auto w-[7rem]">

                                    <Link to={`/product-details/${product.id}`}>

                                        <img src={product.product_image} alt={product.product_name} className="rounded-lg h-auto w-full m-auto" />

                                    </Link>

                                </div>

                                <div className="product-data-box rounded-lg h-full w-[75%] p-3 flex flex-col items-start justify-start gap-3">

                                    <p>{product.product_name}</p>

                                    <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>

                                    <div className="h-auto w-full flex items-center justify-between">

                                        <p className="h-auto w-auto flex items-center justify-center gap-2">

                                            <span className="old-price line-through">${product.old_price}</span>

                                            <span className="new-price font-bold">${product.new_price}</span>

                                        </p>

                                        <div className="border border-slate-300 rounded-2xl bg-slate-50 p-1 inline-flex items-center justify-center">

                                            <button className="rounded-full h-auto w-auto px-3 py-2 hover:bg-slate-100" onClick={() => decrease_quantity(product.id)}>−</button>

                                            <input className="outline-none rounded-full h-auto w-[3rem] px-3 py-2 text-center font-semibold" type="number" value={product.quantity} readOnly={true} />

                                            <button className="rounded-full h-auto w-auto px-3 py-2 hover:bg-slate-100" onClick={() => increase_quantity(product.id)}>+</button>

                                        </div>

                                    </div>

                                </div>

                                <button className="add-to-cart-button rounded-lg h-[7rem] w-auto p-2 bg-red-100 hover:bg-red-300" onClick={() => remove_product(product.id)}>Remove Product</button>

                            </div>

                        ))

                    )

            }

        </div >

    );

};

export default Cart_List;