import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFront } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import image1 from "../assets/woman.jpg";
import emp1 from "../assets/emp1.png";
import emp2 from "../assets/emp2.png";
import emp3 from "../assets/emp3.png";


export default function About(props) {
  return (
    <div className="flex flex-col mx-auto max-w-5xl pt-20">

      <div className="flex flex-row justify-between">
        <div className=" w-5/12 mr-4 place-self-center">
          <div className="text-3xl font-semibold">Our Story</div>
          <div className="mt-5 text-sm font-medium">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </div>
          <div className="mt-5 text-sm font-medium">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </div>
        </div>

        <div className="w-7/12 ml-4">
          <img src={image1} alt="im1" />
        </div>
      </div>

      <div className=" flex flex-row mt-40 justify-between gap-10">

        <div className=" flex flex-col w-3/12 h-48 border rounded border-gray-400">
          <FontAwesomeIcon
            className="text-3xl w-max p-2 border rounded-full border-black bg-gray-300 place-self-center mt-7"
            icon={faStore}
          />
          <div className=" place-self-center mt-5 text-2xl font-bold">
            10.5k
          </div>
          <div className=" place-self-center mt-2">
            Sallers active on our site
          </div>
        </div>
        <div className=" flex flex-col w-3/12 h-48 border rounded border-gray-400">
          <FontAwesomeIcon
            className="text-3xl w-max p-2 border rounded-full border-black bg-gray-300 place-self-center mt-7"
            icon={faTruckFront}
          />
          <div className=" place-self-center mt-5 text-2xl font-bold">
            33k
          </div>
          <div className=" place-self-center mt-2">
            Monthly products sale
          </div>
        </div>
        <div className=" flex flex-col w-3/12 h-48 border rounded border-gray-400">
          <FontAwesomeIcon
            className="text-3xl w-max p-2 border rounded-full border-black bg-gray-300 place-self-center mt-7"
            icon={faBasketShopping}
          />
          <div className=" place-self-center mt-5 text-2xl font-bold">
            45.5k
          </div>
          <div className=" place-self-center mt-2">
            Customers active in out site
          </div>
        </div>
        <div className=" flex flex-col w-3/12 h-48 border rounded border-gray-400">
          <FontAwesomeIcon
            className="text-3xl w-max p-2 border rounded-full border-black bg-gray-300 place-self-center mt-7"
            icon={faSackDollar}
          />
          <div className=" place-self-center mt-5 text-2xl font-bold">
            25k
          </div>
          <div className=" place-self-center mt-2">
            Anual gross sale in out site
          </div>
        </div>
      </div>

        <div className="flex flex-row mt-40 justify-between gap-10">
            <div className="flex flex-col h-30 w-30">
                <img
                    src={emp1}
                    alt=""
                />
                <div className="text-3xl font-semibold mt-5">
                    Tom Cruise
                </div>
                <div className="mt-3">
                    Founder & Chairman
                </div>
            </div>

            <div className="flex flex-col h-30 w-30">
                <img
                    src={emp2}
                    alt=""
                />
                <div className="text-3xl font-semibold mt-5">
                    Emma Watson
                </div>
                <div className="mt-3">
                    Managing Director
                </div>
            </div>

            <div className="flex flex-col h-30 w-30">
                <img
                    src={emp3}
                    alt=""
                />
                <div className="text-3xl font-semibold mt-5">
                    Will Smith
                </div>
                <div className="mt-3">
                    Product Designer
                </div>
            </div>
        </div>

        <div className="flex flex-row my-40 justify-between gap-10 px-5">
            <div className="flex flex-col h-40 w-58">
                <div className="flex h-14 w-14 rounded-full bg-black place-self-center">
                    <FontAwesomeIcon
                        className="text-2xl pl-3 text-white place-self-center"
                        icon={faTruckFast}
                    />
                </div>
                <div className=" text-xl font-bold place-self-center mt-5">
                    FREE AND FAST DELIVERY
                </div>
                <div className="text-sm font-medium mt-3 place-self-center">
                    Free delivery for all orders over $140
                </div>
            </div>

            <div className="flex flex-col h-40 w-58">
                <div className="flex h-14 w-14 rounded-full bg-black place-self-center">
                    <FontAwesomeIcon
                        className="text-2xl pl-4 text-white place-self-center"
                        icon={faHeadset}
                    />
                </div>
                <div className=" text-xl font-bold place-self-center mt-5">
                    24/7 CUSTOMER SERVICE
                </div>
                <div className="text-sm font-medium mt-3 place-self-center">
                    Friendly 24/7 customer support
                </div>
            </div>

            <div className="flex flex-col h-40 w-58">
                <div className="flex h-14 w-14 rounded-full bg-black place-self-center">
                    <FontAwesomeIcon
                        className="text-2xl pl-4 text-white place-self-center"
                        icon={faCircleCheck}
                    />
                </div>
                <div className=" text-xl font-bold place-self-center mt-5">
                    MONEY BACK GUARANTEE
                </div>
                <div className="text-sm font-medium mt-3 place-self-center">
                    We return money within 30 days
                </div>
            </div>
        </div>
    </div>
  );
}
