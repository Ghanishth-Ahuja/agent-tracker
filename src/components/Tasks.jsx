// TaskList.jsx
import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks/me", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("Non-OK response:", res.status, text);
          throw new Error("Unauthorized or server error");
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-4">Loading...</p>;

  if (tasks.length === 0)
    return <p className="text-center text-gray-500 mt-4">No tasks assigned.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {task.firstname}
            </h3>
            <p className="text-sm text-gray-600">Phone: {task.phone}</p>
            <p className="text-sm text-gray-700 mt-2">Notes: {task.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
