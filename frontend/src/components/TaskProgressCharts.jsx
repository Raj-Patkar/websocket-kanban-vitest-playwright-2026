import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function TaskProgressCharts({ columns }) {
  const columnNames = Object.keys(columns);

  const barData = columnNames.map((col) => ({
    name: col,
    tasks: columns[col].length,
  }));

  const totalTasks = columnNames.reduce(
    (sum, col) => sum + columns[col].length,
    0
  );

  const doneTasks = columns["Done"]?.length || 0;

  const pieData = [
    { name: "Done", value: doneTasks },
    { name: "Remaining", value: totalTasks - doneTasks },
  ];
  
  const COLORS = ["#22c55e", "#f3a589"];

  return (
    <div className="sticky top-4 bg-white rounded-xl shadow p-4 space-y-6">
      
      <h3 className="text-lg font-semibold">Progress</h3>

      {/* Bar Chart */}
      <div>
        <p className="text-sm font-medium mb-2">Tasks per Column</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="tasks" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="text-center">
        <p className="text-sm font-medium mb-2">Completion</p>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              innerRadius={55}
              outerRadius={75}
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <p className="text-sm text-gray-600">
          {totalTasks === 0
            ? "No tasks yet"
            : `${Math.round((doneTasks / totalTasks) * 100)}% done`}
        </p>
      </div>

    </div>
  );
}