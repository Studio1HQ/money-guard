export const RecentTransactions = () => {
  return (
    <div className="bg-white shadow-md p-4 w-full rounded">
      <h4 className="text-lg font-semibold mb-4">Recent Transactions</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-950 text-sm">
              <th className="text-left pb-2">Name</th>
              <th className="text-left pb-2">Mode</th>
              <th className="text-left pb-2">Date</th>
              <th className="text-right pb-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Figma(Subscription)</td>
              <td>Credit Card</td>
              <td>26-06-2022</td>
              <td className="text-right text-red-950">-1850 ₹</td>
            </tr>
            <tr>
              <td className="py-2">John Doe</td>
              <td>Debit Card</td>
              <td>20-06-2022</td>
              <td className="text-right text-green-950">+15000 ₹</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
