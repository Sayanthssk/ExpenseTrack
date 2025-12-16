import ExpenseBarChart from "../Charts/ExpensePieChart";
import DashboardLayout from "../Layout/DashboardLayout";


const mockData = [
  { category: "Food", total: 4500 },
  { category: "Travel", total: 3000 },
  { category: "Shopping", total: 2000 },
];

function Dash() {
  return (
    <DashboardLayout>
      <h3>Category-wise Expense Summary</h3>
      <ExpenseBarChart data={mockData} />
    </DashboardLayout>
  );
}

export default Dash;
