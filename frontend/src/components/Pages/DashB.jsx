import { useState, useEffect } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import ExpensePieChart from "../Charts/ExpensePieChart";
import { getExpenses } from "../Services/api";

function DashB() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchExpenses();
  }, [selectedMonth, selectedYear]);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getExpenses({ month: selectedMonth, year: selectedYear });
      setExpenses(data);
    } catch (err) {
      setError("Failed to fetch expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = () => {
    const summary = {};
    expenses.forEach((expense) => {
      // backend returns 'amount' as integer
      if (summary[expense.category]) {
        summary[expense.category] += expense.amount;
      } else {
        summary[expense.category] = expense.amount;
      }
    });

    return Object.keys(summary).map((category) => ({
      category,
      total: summary[category],
    }));
  };

  const chartData = calculateSummary();

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Category-wise Expense Summary</h3>

        <div className="filters" style={{ display: "flex", gap: "10px" }}>
          <select value={selectedMonth} onChange={handleMonthChange} style={{ padding: "5px" }}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange} style={{ padding: "5px" }}>
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        chartData.length > 0 ? (
          <ExpensePieChart data={chartData} />
        ) : (
          <p>No expenses found for this period.</p>
        )
      )}
    </DashboardLayout>
  );
}

export default DashB;
