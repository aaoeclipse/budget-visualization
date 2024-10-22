import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const DEFAULT_CATEGORIES = [
  { name: "Housing", percentage: 30, color: "#FF6B6B" },
  { name: "Transportation", percentage: 15, color: "#4ECDC4" },
  { name: "Food", percentage: 15, color: "#45B7D1" },
  { name: "Utilities", percentage: 10, color: "#96CEB4" },
  { name: "Healthcare", percentage: 10, color: "#FFEEAD" },
  { name: "Entertainment", percentage: 10, color: "#D4A5A5" },
  { name: "Savings", percentage: 10, color: "#9BB7D4" },
];

const BudgetVisualizer = () => {
  const [income, setIncome] = useState("");
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const handleIncomeChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setIncome(value);
  };

  const handlePercentageChange = (index: any, value: any) => {
    const newValue = Math.min(100, Math.max(0, Number(value)));
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], percentage: newValue };
    setCategories(newCategories);
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const calculateAmount = (percentage: any) => {
    return Number(income) * (percentage / 100);
  };

  const totalPercentage = categories.reduce(
    (sum, cat) => sum + cat.percentage,
    0
  );

  return (
    <div className="flex w-screen justify-center items-center">
      <div className="w-screen max-w-4xl mx-auto p-4 space-y-4 flex justify-center overflow-hidden">
        <Card>
          <CardHeader>
            <CardTitle>Budget Visualization Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Monthly Income
              </label>
              <Input
                type="text"
                value={income}
                onChange={handleIncomeChange}
                placeholder="Enter your monthly income"
                className="max-w-xs"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Budget Categories</h3>
                <div className="text-sm text-gray-500 mb-2">
                  Total allocation: {totalPercentage}%
                </div>
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="w-32">{category.name}</span>
                    <Input
                      type="number"
                      value={category.percentage}
                      onChange={(e) =>
                        handlePercentageChange(index, e.target.value)
                      }
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm">
                      {formatCurrency(calculateAmount(category.percentage))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-[300px] w-full relative bg-card">
                <PieChart width={800} height={400}>
                  <Pie
                    data={categories} // Use updated categories here
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="percentage"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetVisualizer;
