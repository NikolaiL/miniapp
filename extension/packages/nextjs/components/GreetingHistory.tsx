"use client";

import { sql } from "@ponder/client";
import { usePonderQuery } from "@ponder/react";
import { Address } from "@scaffold-ui/components";
import { formatEther } from "viem";

type Greeting = {
  id: string;
  text: string;
  setterId: `0x${string}`;
  premium: boolean;
  value: bigint;
  timestamp: number;
};

export const GreetingHistory = () => {
  const { data: result, isLoading } = usePonderQuery({
    queryFn: db => db.execute<Greeting>(sql`SELECT * FROM greeting ORDER BY timestamp DESC LIMIT 20`),
  });

  // Handle different response formats from db.execute
  // db.execute typically returns { rows: [...] } or an array directly
  let greetings: Greeting[] = [];

  if (result) {
    // Check if result has a 'rows' property (common SQL result format)
    if (typeof result === "object" && result !== null && "rows" in result) {
      const rows = (result as { rows: any[] }).rows;
      if (rows && rows.length > 0) {
        // Check if rows are arrays or objects
        if (Array.isArray(rows[0])) {
          // Rows are arrays - map to objects based on column order
          greetings = rows.map((row: any[]) => ({
            id: String(row[0] ?? ""),
            text: String(row[1] ?? ""),
            setterId: row[2] as `0x${string}`,
            premium: Boolean(row[3]),
            value: BigInt(row[4] ?? 0),
            timestamp: Number(row[5] ?? 0),
          }));
        } else {
          // Rows are objects
          greetings = rows as Greeting[];
        }
      }
    } else if (Array.isArray(result)) {
      // Result is directly an array
      if (result.length > 0 && Array.isArray(result[0])) {
        // Array of arrays - map to objects
        greetings = (result as unknown as any[][]).map((row: any[]) => ({
          id: String(row[0] ?? ""),
          text: String(row[1] ?? ""),
          setterId: row[2] as `0x${string}`,
          premium: Boolean(row[3]),
          value: BigInt(row[4] ?? 0),
          timestamp: Number(row[5] ?? 0),
        }));
      } else {
        // Array of objects - use directly
        greetings = result as Greeting[];
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center flex-col flex-grow pt-12">
        <div className="loading loading-dots loading-md"></div>
      </div>
    );
  }

  if (!greetings || greetings.length === 0) {
    return (
      <div className="flex items-center flex-col flex-grow pt-4">
        <p className="text-center text-xl font-bold">No greetings found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {greetings.map(greeting => (
        <div
          key={greeting.id}
          className={`card bg-base-100 shadow-xl w-full max-w-2xl mx-auto ${greeting.premium ? "border-3 border-success" : ""}`}
        >
          <div className="card-body">
            <p className="text-4xl font-bold mb-2 text-center">{greeting.text}</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Address address={greeting.setterId} />
              <span className="text-base-content/60">•</span>
              <span className="text-base-content/60">{new Date(greeting.timestamp * 1000).toLocaleString()}</span>
            </div>
            {greeting.premium && (
              <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
                <span className="badge badge-primary">Premium (Ξ{formatEther(greeting.value)})</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
