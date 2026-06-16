import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context_API } from "../App";
import Men_Banner from "/Men-Banner.jpg";

function Men_Category({ category }) {

    const { light_mode, product_data } = useContext(Context_API);

    let filtered_data = product_data.filter((product) => {
        return product.category === category;
    });

    return (

        <div className={`men-category-box flex-grow h-full w-full p-5 ${light_mode ? "bg-gray-100" : "bg-gray-300"}`}>

            <div className="banner">

                <img className="rounded-lg h-auto w-auto m-auto my-7" src={Men_Banner} alt="Image Not Available" />

            </div>

            <div className="products-list p-5 flex flex-wrap items-center justify-evenly gap-5">

                {

                    filtered_data.length > 0

                        ?

                        (

                            filtered_data.map((product) => (

                                <Link to={`/product-details/${product.id}`} key={product.id}>

                                    <div className="product-box rounded-lg h-auto w-[20rem] bg-white text-black p-5 flex flex-col items-center justify-center gap-5 shadow-soft transition hover:-translate-y-2 hover:shadow-2xl">

                                        <img className="rounded-lg h-[20rem]" src={product.product_image} alt="Image Not Available" />

                                        <h2>{product.product_name}</h2>

                                        <div className="product-prices flex items-center justify-start gap-2">

                                            <span className="old-price line-through">${product.old_price}</span>

                                            <span className="new-price font-bold text-lg">${product.new_price}</span>

                                        </div>

                                    </div>

                                </Link>

                            ))

                        )

                        :

                        (

                            <p className="text-center text-3xl m-auto p-10">Loading Products...</p>

                        )

                }

            </div>

        </div>

    );

};

export default Men_Category;