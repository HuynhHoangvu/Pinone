import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-indigo-500 p-2 rounded">
            🏠 Dashboard
          </a>
          <a href="#" className="hover:bg-indigo-500 p-2 rounded">
            👥 Users
          </a>
          <a href="#" className="hover:bg-indigo-500 p-2 rounded">
            📦 Products
          </a>
          <a href="#" className="hover:bg-indigo-500 p-2 rounded">
            📊 Reports
          </a>
          <a href="#" className="hover:bg-indigo-500 p-2 rounded">
            ⚙️ Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hello, Toàn 👋</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="rounded-full border-2 border-indigo-600"
            />
          </div>
        </header>

        {/* Stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Users" value="1,245" />
          <Card title="Orders" value="320" />
          <Card title="Revenue" value="$12,580" />
          <Card title="Feedback" value="97%" />
        </section>

        {/* Chart placeholder */}
        <section className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Sales Overview
          </h2>
          <div className="h-60 flex items-center justify-center text-gray-400">
            📈 Chart will go here
          </div>
        </section>
      </main>
    </div>
  );
};

type CardProps = {
  title: string;
  value: string;
};

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default Dashboard;
