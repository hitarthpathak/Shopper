import { useContext } from "react";
import { Context_API } from "../../../App";
import Offer_Image from "/Offer.jpg";

function Offer() {

    const { light_mode } = useContext(Context_API);

    function offers() {
        let coupon_code = prompt("Enter Your Coupon Code!");
        if (coupon_code == "") {
            return;
        }
        else if (!coupon_code) {
            return;
        }
        else {
            alert("Invalid Coupon Code!");
        }
    };

    return (

        <div className={`introduction-box rounded-lg h-auto w-[80%] my-12 m-auto ${light_mode ? "bg-red-100" : "bg-red-300"} flex items-center justify-center p-10`}>

            <div className="left h-[20rem] w-1/2 pt-20 text-black flex flex-col items-center justify-start gap-20">

                <h1 className="text-5xl">Exclusive Offers For You</h1>

                <button className="rounded-lg p-3 bg-blue-700 text-white" onClick={offers}>Check Now</button>

            </div>

            <div className="right h-[20rem] w-1/2 flex flex-col items-center justify-center">

                <img className="rounded-lg h-full" src={Offer_Image} alt="Image Not Available" />

            </div>

        </div>

    );

};

export default Offer;