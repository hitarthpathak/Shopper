import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context_API } from "../../../App";

function Popular({ category }) {

    const { light_mode, product_data } = useContext(Context_API);

    let filtered_data = product_data.filter((product) => {
        return product.category === category;
    }).slice(0, 3);

    let display_category = category.charAt(0).toUpperCase() + category.slice(1);

    return (

        <div className={`popular-box h-auto w-full p-5 ${light_mode ? "bg-gray-100" : "bg-gray-300 text-black"}`}>

            <h1 className="text-3xl text-center my-7">Popular In {display_category}</h1>

            <div className="products-list p-5 flex flex-wrap items-center justify-evenly">

                {

                    filtered_data.length > 0

                        ?

                        (

                            filtered_data.map((product) => (

                                <Link to={`/product-details/${product.id}`} key={product.id}>

                                    {/* <div className="product-box rounded-lg h-auto w-[20rem] bg-blue-700 text-white p-5 flex flex-col items-center justify-center gap-5">

                                        <img className="rounded-lg h-[20rem]" src={product.product_image} alt="Image Not Available" />

                                        <h2>{product.product_name}</h2>

                                        <div className="product-prices flex items-center justify-start gap-2">

                                            <span className="old-price line-through">${product.old_price}</span>

                                            <span className="new-price font-bold text-lg">${product.new_price}</span>

                                        </div>

                                    </div> */}

                                    <div className="product-box rounded-lg h-auto w-[20rem] bg-white text-black p-5 flex flex-col items-center justify-center gap-5 shadow-soft transition hover:-translate-y-2 hover:shadow-2xl">

                                        <img className="rounded-lg h-[20rem]" src={product.product_image} alt="Image Not Available" />

                                        <h2>{product.product_name}</h2>

                                        <div className="product-prices flex items-center justify-start gap-2">

                                            <span className="old-price line-through">${product.old_price}</span>

                                            <span className="new-price font-bold text-lg">${product.new_price}</span>

                                        </div>

                                    </div>

                                    {/* <article className="glass-card overflow-hidden p-5 shadow-soft transition hover:-translate-y-2 hover:shadow-2xl">
                                        <img className="h-80 w-auto m-auto rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-105" src={product.product_image} alt={product.product_name} />
                                        <div className="mt-5 space-y-3 text-slate-900">
                                            <h3 className="text-xl font-semibold">{product.product_name}</h3>
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <span className="line-through">${product.old_price}</span>
                                                <span className="font-semibold text-slate-950">${product.new_price}</span>
                                            </div>
                                        </div>
                                    </article> */}

                                </Link>

                            ))

                        )

                        :

                        (

                            <p>Loading Products...</p>

                        )

                }

            </div>

        </div>

    );

};

export default Popular;