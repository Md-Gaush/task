import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function DataTable({ data, filter }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  
  const filtered = useMemo(() => {
    return Array.isArray(data)
      ? data.filter((item) => filter === "All" || item.status === filter)
      : [];
  }, [data, filter]);

  
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + rowsPerPage);

  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <Card className="mt-6 shadow-md border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Probability</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.probability}</TableCell>

                <TableCell>
                  <Badge
                    className={
                      item.status === "Verified"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-600 hover:bg-yellow-700"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

       
        <div className="flex items-center justify-center gap-2 p-4 border-t">

        
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </Button>

          
          {pageNumbers.map((num) => (
            <Button
              key={num}
              variant={num === page ? "default" : "outline"}
              className={`w-10 p-0 ${
                num === page ? "bg-black text-white" : ""
              }`}
              onClick={() => setPage(num)}
            >
              {num}
            </Button>
          ))}

        
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}

export default DataTable;
