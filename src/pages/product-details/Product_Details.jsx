import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context_API } from "../../App";
import Product_Images from "./sub-components/Product_Images";
import Product_Data from "./sub-components/Product_Data";

function Product_Details() {

    const { light_mode, product_data } = useContext(Context_API);
    const { product_id } = useParams();

    let current_product = product_data.find((product) => {
        return product.id == product_id;
    });

    if (!current_product) {
        return (
            <h1 className="text-center text-3xl p-10">Loading Product...</h1>
        );
    };

    return (

        <div className={`product-details-box flex-grow h-full w-full m-auto p-10 ${light_mode ? "bg-gray-100" : "bg-gray-300"} flex items-start justify-center gap-5`}>

            <Product_Images current_product={current_product} />

            <Product_Data current_product={current_product} />

        </div>

    );

};

export default Product_Details;