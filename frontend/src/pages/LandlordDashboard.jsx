import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

import axios from "axios";

export default function LandlordDashboard() {
  const [summary, setSummary] = useState({});
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ name: "", rent: "" });

  useEffect(() => {
    axios.get("/api/landlord/summary").then(res => setSummary(res.data));
    axios.get("/api/landlord/units").then(res => setUnits(res.data));
  }, []);

  const addUnit = async (e) => {
    e.preventDefault();
    await axios.post("/api/landlord/units", newUnit);
    const updated = await axios.get("/api/landlord/units");
    setUnits(updated.data);
    setNewUnit({ name: "", rent: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Landlord Dashboard</h1>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">Monthly Income</p>
            <p className="text-xl font-bold text-green-600">KES {summary.monthly_income || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">Unpaid Rent</p>
            <p className="text-xl font-bold text-red-600">KES {summary.unpaid_rent || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <p className="text-sm text-gray-500">Active Tenants</p>
            <p className="text-xl font-bold">{summary.total_tenants || 0}</p>
          </div>
        </div>

        {/* MONTHLY RENT CHART */}
<div className="bg-white p-6 rounded-xl shadow-md mb-8">
  <h2 className="text-lg font-semibold mb-4">Monthly Rent Collected</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={summary.monthly_chart || []}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</div>

        {/* ADD UNIT FORM */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4">Add New Unit</h2>
          <form onSubmit={addUnit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Unit Name (e.g. A1)"
              value={newUnit.name}
              onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Monthly Rent (KES)"
              value={newUnit.rent}
              onChange={(e) => setNewUnit({ ...newUnit, rent: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Unit
            </button>
          </form>
        </div>

        {/* UNITS LIST */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Units</h2>
          <table className="w-full text-sm border">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left p-2">Unit</th>
                <th className="text-left p-2">Rent</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{unit.name}</td>
                  <td className="p-2">KES {unit.rent}</td>
                  <td className="p-2">{unit.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
