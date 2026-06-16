import Introduction from "./sub-components/Introduction";
import Offer from "./sub-components/Offer";
import Popular from "./sub-components/Popular";

function Home() {

    return (

        <div className="home-page flex-grow">

            <Introduction />

            <Popular category={"men"} />

            <Popular category={"women"} />

            <Popular category={"kids"} />

            <Offer />

        </div>

    );

};

export default Home;