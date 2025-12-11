import { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import Table from "./Table";
import SyncLogs from "./SyncLogs";

function App() {
  const [inputNames, setInputNames] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");

  const loadData = async () => {
    const res = await axios.get("https://task-h66k.onrender.com/api/all");
    setData(res?.data?.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    const namesArray = inputNames.split(",").map((n) => n.trim()).filter(Boolean); ;
    if (namesArray.length === 0) {
      alert("Please enter at least one name.");
      return;
    }
    await axios.post("https://task-h66k.onrender.com/api/details", {
      names: namesArray,
    });

    loadData();
    setInputNames("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            DETAILS
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          
          <Textarea
            rows={4}
            placeholder="Enter Names: lucky, rajeev, saad..."
            value={inputNames}
            onChange={(e) => setInputNames(e.target.value)}
          />

          <Button className="w-fit" onClick={handleSubmit}>
            Submit
          </Button>

          <Select onValueChange={(value) => setFilter(value)} >
            <SelectTrigger>
              <SelectValue placeholder="Filter Details" />
            </SelectTrigger>

            <SelectContent >
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="To Check">To Check</SelectItem>
            </SelectContent>
          </Select>

          <Table data={data} filter={filter} />
          <SyncLogs />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
