import { useState } from "react";

function Product_Images({ current_product }) {

    const [main_image, set_main_image] = useState("");

    let sub_images = current_product.product_sub_image ? current_product.product_sub_image : [current_product.product_image];

    return (

        <div className="product-image-box h-auto w-1/2 flex flex-col items-center justify-center gap-3">

            <div className="main-image h-full w-full p-5 bg-white flex items-center justify-center rounded-2xl shadow-xl">

                <img className="rounded-2xl h-auto w-1/2" src={main_image ? main_image : current_product.product_image} alt="Image Not Available" />

            </div>

            <div className="sub-images h-full w-full flex items-center justify-center gap-3">

                {

                    sub_images.map((img, idx) => (

                        <img key={idx} className={`rounded-2xl border-2 sub-image h-[7rem] w-auto cursor-pointer overflow-auto ${main_image === img ? "border-red-500" : "border"} hover:border-gray-500`} src={img} alt="Image Not Available" onClick={() => set_main_image(img)} />

                    ))

                }

            </div>

        </div>

    );

};

export default Product_Images;