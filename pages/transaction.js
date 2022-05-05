import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function transaction() {
  const router = useRouter();
  const { jwt } = useSelector((state) => state.storeManage);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (jwt == "null") return router.push("/login");
    async function getTransactions() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/transaction`,
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
                From
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                Coin
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {transaction._id}
                </th>
                <td className="px-6 py-4">{transaction.from}</td>
                <td className="px-6 py-4">{transaction.to}</td>
                <td className="px-6 py-4">{transaction.coin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
transaction.layout = Layout;
