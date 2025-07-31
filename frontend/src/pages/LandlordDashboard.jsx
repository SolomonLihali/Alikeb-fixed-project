import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // If using shadcn or Tailwind cards
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const landlordStats = {
  totalMonthlyIncome: 150000,
  totalUnpaidRent: 25000,
  totalUnits: 12,
  totalTenants: 10,
};

const rentChartData = [
  { month: "Jan", rent: 12000 },
  { month: "Feb", rent: 14000 },
  { month: "Mar", rent: 10000 },
  { month: "Apr", rent: 16000 },
  { month: "May", rent: 13000 },
  { month: "Jun", rent: 15000 },
];

const LandlordDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Landlord Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Monthly Income</h2>
            <p className="text-xl text-green-600">Ksh {landlordStats.totalMonthlyIncome}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Unpaid Rent</h2>
            <p className="text-xl text-red-600">Ksh {landlordStats.totalUnpaidRent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Total Units</h2>
            <p className="text-xl">{landlordStats.totalUnits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Tenants</h2>
            <p className="text-xl">{landlordStats.totalTenants}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Monthly Rent Collection</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rentChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rent" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LandlordDashboard;
