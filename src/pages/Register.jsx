import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context_API } from "../App";

function Register() {

    const { light_mode, shopper_users, set_shopper_users } = useContext(Context_API);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    function form_submit(data) {
        let { confirm_password, ...users_data } = data;
        users_data = { ...users_data, cart: [] };
        let users = shopper_users.length ? shopper_users : JSON.parse(localStorage.getItem("shopper-users")) || [];
        if (users.some((user) => user.e_mail == users_data.e_mail)) {
            alert("This E-Mail Is Already Registered!");
            return;
        }
        users.push(users_data);
        set_shopper_users(users);
        localStorage.setItem("shopper-users", JSON.stringify(users));
        reset();
        navigate("/login");
    };

    return (

        <div className={`registration-box flex-grow h-full w-full p-14 ${light_mode ? "bg-gray-100" : "bg-gray-300 text-black"}`}>

            <h1 className="text-center text-3xl mb-7">Register Page</h1>

            <form className="registration-form rounded-3xl h-auto w-1/2 m-auto p-7 bg-white flex flex-col items-center justify-center gap-5 shadow-xl" onSubmit={handleSubmit(form_submit)}>

                <div className="h-auto w-full">

                    <input className={`rounded-full outline-none h-auto w-full bg-gray-100 p-3 ${light_mode ? "text-black" : "text-black"}`} type="text" placeholder="Enter Your Full Name" {...register("full_name", { required: "Full Name Is Required!" })} />
                    {errors.full_name && (<p className="font-bold text-red-500">{errors["full_name"].message}</p>)}

                </div>

                <div className="h-auto w-full">

                    <input className={`rounded-full outline-none h-auto w-full bg-gray-100 p-3 ${light_mode ? "text-black" : "text-black"}`} type="text" placeholder="Enter Your Mobile Number" {...register("mobile_number", { required: "Mobile Number Is Required!", pattern: { value: /^[0-9]{10}$/, message: "Invalid Mobile Number!" } })} />
                    {errors.mobile_number && (<p className="font-bold text-red-500">{errors["mobile_number"].message}</p>)}

                </div>

                <div className="h-auto w-full">

                    <input className={`rounded-full outline-none h-auto w-full bg-gray-100 p-3 ${light_mode ? "text-black" : "text-black"}`} type="text" placeholder="Enter Your E-Mail" {...register("e_mail", { required: "E-Mail Is Required!", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid E-Mail!" } })} />
                    {errors.e_mail && (<p className="font-bold text-red-500">{errors["e_mail"].message}</p>)}

                </div>

                <div className="h-auto w-full">

                    <input className={`rounded-full outline-none h-auto w-full bg-gray-100 p-3 ${light_mode ? "text-black" : "text-black"}`} type="password" placeholder="Enter Your Password" {...register("password", { required: "Password Is Required!", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.$!%*?&])[A-Za-z\d@.$!%*?&]{8,}$/, message: "Password Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number And One Special Character!" } })} />
                    {errors.password && (<p className="font-bold text-red-500">{errors["password"].message}</p>)}

                </div>

                <div className="h-auto w-full">

                    <input className={`rounded-full outline-none h-auto w-full bg-gray-100 p-3 ${light_mode ? "text-black" : "text-black"}`} type="password" placeholder="Enter Your Confirm Password" {...register("confirm_password", { required: "Confirm Password Is Required!", validate: (value) => value === watch("password") || "Confirm Password Is Not Same As Password!" })} />
                    {errors.confirm_password && (<p className="font-bold text-red-500">{errors["confirm_password"].message}</p>)}

                </div>

                <input className="rounded-full h-auto w-full p-3 bg-blue-700 text-white cursor-pointer" type="submit" value="Register" />

                <p>Already Have An Account? <Link to={"/login"} className="hover:underline hover:text-blue-500">Login Now!</Link></p>

            </form>

        </div >

    );

};

export default Register;