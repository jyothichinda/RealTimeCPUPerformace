import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

const App = () => {
  const [cpuPercentage, setCpuPercentage] = useState([]);

  useEffect(() => {
    // Listen for CPU events and update the state
    socket.on("cpu", (data) => {
      setCpuPercentage((current) => [...current, data]);
    });

    return () => {
      socket.off("cpu"); // Cleanup on component unmount
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Data</h1>
      <LineChart
        width={730}
        height={250}
        data={cpuPercentage}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
