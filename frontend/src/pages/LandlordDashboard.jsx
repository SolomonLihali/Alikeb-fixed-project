import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function LandlordDashboard() {
  const [month, setMonth] = useState("2025-07");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get(`/api/payments?month=${month}`).then((res) => setPayments(res.data));
  }, [month]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(payments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    XLSX.writeFile(workbook, `Payments-${month}.xlsx`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Landlord Dashboard</h1>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      <button
        onClick={exportToExcel}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Export to Excel
      </button>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Amount Paid</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, index) => (
            <tr key={index} className="border-t">
              <td>{p.name}</td>
              <td>{p.unit}</td>
              <td>{p.amount}</td>
              <td>{p.payment_date?.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
