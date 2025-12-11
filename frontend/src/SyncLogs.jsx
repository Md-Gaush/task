import React, { useEffect, useState } from "react";
import axios from "axios";

function SyncLogs() {
  const [msgs, setMsgs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get("http://localhost:8000/api/msg");
    console.log("res dekho",res?.data)
    setMsgs(res.data.data);
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-red-400 text-green-400 font-mono rounded-md h-64 overflow-auto">
      <h2 className="text-lg font-bold text-white mb-2">CRM Sync Logs</h2>

      {msgs.map((msg) => (
        <div key={msg._id}>{msg.message}</div>
      ))}
    </div>
  );
}

export default SyncLogs;
