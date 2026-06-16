import { useState, useEffect, useContext } from "react";
import { Context_API } from "../../../App";

function Cart_Amount() {

    const { cart } = useContext(Context_API);

    const [total_amount, set_total_amount] = useState(0);
    const [discount_amount, set_discount_amount] = useState(0);
    const [net_amount, set_net_amount] = useState(0);

    useEffect(() => {
        let total = 0;
        let discount = 0;
        let net_amount = 0;
        cart.forEach((product) => {
            let quantity = Number(product.quantity);
            let new_price = parseInt(product.new_price.replace(/\D/g, "")) * quantity;

            total += new_price;
        });
        discount += total * 0.25;
        net_amount = total - discount;

        set_total_amount(total);
        set_discount_amount(discount);
        set_net_amount(net_amount);
    }, [cart]);

    return (

        <div className="cart-amount h-auto w-[40%] flex flex-col items-stretch justify-center gap-3">

            <h1 className="text-3xl mb-5">Cart Amount</h1>

            <div className="cart-amount-box h-auto text-center rounded-lg bg-white p-7 shadow-xl">

                <div className="mb-5 flex items-center justify-between">

                    <span>Total Amount :</span>

                    <span>{total_amount} USD</span>

                </div>

                <div className="mb-5 flex items-center justify-between">

                    <span>Total Discount (25%) :</span>

                    <span>{discount_amount} USD</span>

                </div>

                <hr />

                <div className="my-5 flex items-center justify-between">

                    <span>Net Amount :</span>

                    <span className="font-bold">{net_amount} USD</span>

                </div>

                <button className="place-order-button rounded-lg h-auto w-full m-auto p-2 text-white bg-gradient-to-r from-rose-500 to-violet-500 enabled:hover:bg-red-600 transition enabled:hover:-translate-y-1 enabled:hover:shadow-xl disabled:opacity-50 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed" disabled={cart.length === 0}>Place Order</button>

                <p className="text-center text-xs mt-5">You save <span className="font-semibold text-red-500">${discount_amount}</span> with this order.</p>

            </div>

        </div>

    );

};

export default Cart_Amount;