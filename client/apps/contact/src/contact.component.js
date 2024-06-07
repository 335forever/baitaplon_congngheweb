import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Contact(props) {
  return (
    <div className=" flex flex-row mx-auto max-w-5xl pt-20 justify-between">
      <div className="flex flex-col max-w-80 rounded shadow-lg p-8">
        <div className="flex flex-row ">
          <FontAwesomeIcon
            className=" rounded-full bg-red-500 p-2 mr-2 text-white"
            icon={faPhone}
          />
          <div className="text-xl font-semibold">Call to us</div>
        </div>
        <div className="pt-4">We are available 24/7, 7 day a week.</div>
        <div className="pt-4">Phone: +8812345680</div>
        <hr class="h-px mt-7 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex flex-row ">
          <FontAwesomeIcon
            className=" rounded-full bg-red-500 p-2 mr-2 text-white"
            icon={faEnvelope}
          />
          <div className="text-xl font-semibold">Write to us</div>
        </div>
        <div className="pt-4">
          Fill out form and we will contact you within 24 hours
        </div>
        <div className="pt-4">Email: customer@exclusive.com</div>
        <div className="pt-4">Email: support@exclusive.com</div>
      </div>

      <div className="flex flex-col rounded shadow-lg p-8 w-8/12">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className=" text-gray-500">
              Your Name<span className=" text-red-500">*</span>
            </div>
            <input type="text" className=" bg-gray-200 h-10" />
          </div>

          <div className="flex flex-col">
            <div className=" text-gray-500">
              Your Email<span className=" text-red-500">*</span>
            </div>
            <input type="text" className=" bg-gray-200 h-10" />
          </div>

          <div className="flex flex-col">
            <div className=" text-gray-500">
              Your Phone<span className=" text-red-500">*</span>
            </div>
            <input type="text" className=" bg-gray-200 h-10" />
          </div>
        </div>

        <textarea
          type="text"
          className="bg-gray-200 h-48 mt-7 resize-none"
          placeholder="Your Message"
        />

        <button
          className="h-10 w-36 mt-5 bg-red-600 hover:bg-orange-500 active:bg-orange-600
            rounded text-sm font-medium text-white place-self-end "
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

