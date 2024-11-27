import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../utils/api/rolesApi";
import { fetchUser } from "../utils/api/userApi";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Home = () => {
  const [roleLabels, setRoleLabels] = useState([]);
  const [roleCounts, setRoleCounts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchUser());
  }, [dispatch]);

  const { roles } = useSelector((store) => store.roles);
  const { user } = useSelector((store) => store.user);

 
  useEffect(() => {
    if (user?.length) {
      const roleCountMap = user.reduce((acc, curr) => {
        acc[curr.role] = (acc[curr.role] || 0) + 1; 
        return acc;
      }, {});

      const labels = Object.keys(roleCountMap); 
      const counts = Object.values(roleCountMap); 

      setRoleLabels(labels);
      setRoleCounts(counts);
    }
  }, [user]);

  const usersData = {
    labels: roleLabels,
    datasets: [
      {
        label: "User Count by Role",
        data: roleCounts,
        backgroundColor: ["#8d80d1", "#f2ebf9"], 
        borderWidth: 1,
      },
    ],
  };

  const deactivatedData = {
    labels: ["Active Users", "Deactivated Users"],
    datasets: [
      {
        label: "Users",
        data: [
          user?.filter((item) => item.status).length, 
          user?.filter((item) => !item.status).length, 
        ],
        backgroundColor: ["#8d80d1", "#f2ebf9"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      <header className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700">RBAC</h1>
        <p className="text-gray-500">
          Welcome back! Here's an overview of user statistics.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            User Count by Roles
          </h2>
          <Bar
            data={usersData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Active vs Deactivated Users
          </h2>
          <Doughnut
            data={deactivatedData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
