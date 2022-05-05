import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function dashboard() {
  const router = useRouter();
  const { jwt } = useSelector((state) => state.storeManage);
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    if (jwt == "null") return router.push("/login");
    async function getTransactions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/getBlock`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res.status == 200) {
        if (res.data.success == true) {
          const data = res.data.data;
          setTransactions(data);
        }
      }
    }

    async function findAllBlock() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/findAllBlock`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res.status == 200) {
        if (res.data.success == true) {
          const data = res.data.data;
          setBlocks(data);
        }
      }
    }
    findAllBlock();
    getTransactions();
  }, [jwt]);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                PrevHash
              </th>
              <th scope="col" className="px-6 py-3">
                Hash
              </th>
              <th scope="col" className="px-6 py-3">
                Coin
              </th>
              <th scope="col" className="px-6 py-3">
                MineVar
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {block._id}
                </th>
                <td className="px-6 py-4">{block.prevHash}</td>
                <td className="px-6 py-4">{block.hash}</td>
                <td className="px-6 py-4">{block.coin}</td>
                <td className="px-6 py-4">{block.mineVar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
dashboard.layout = Layout;
