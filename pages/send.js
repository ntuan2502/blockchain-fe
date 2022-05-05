import Layout from "../components/layout";
import { useRouter } from "next/router";
import { updateJwt, updateUser } from "../redux/storeManage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function send() {
  const router = useRouter();
  const { jwt, user } = useSelector((state) => state.storeManage);
  const [from, setFrom] = useState(user._id);
  const [to, setTo] = useState("");
  const [coin, setCoin] = useState(0);
  useEffect(() => {
    if (jwt == "null") {
      return router.push("/login");
    }
  }, [jwt]);

  const onSubmit = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/send`,
      {
        from,
        to,
        coin,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (res.status === 200) {
      if (res.data.success == true) {
        const data = res.data.data;
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }
  };
  return (
    <div className="">
      <form>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="from"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            disabled
            onChange={(e) => setFrom(e.target.value)}
            value={user._id}
          />
          <label
            htmlFor="from"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            From
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="to"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            onChange={(e) => setTo(e.target.value)}
            value={to}
          />
          <label
            htmlFor="to"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            To
          </label>
        </div>

        <div className="grid xl:grid-cols-2 xl:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="coin"
              id="coin"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required=""
              onChange={(e) => setCoin(e.target.value)}
              value={coin}
            />
            <label
              htmlFor="coin"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Coin
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
send.layout = Layout;
