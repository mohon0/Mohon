"use client";

import Loading from "@/components/common/loading/Loading";
import { FetchUserChart } from "@/components/fetch/admin/FetchApplicationChart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BlogChart() {
  const { isLoading, data: chartData, isError } = FetchUserChart();
  return (
    <>
      <div className="mt-20">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>Error fetching chart</div>
        ) : (
          <>
            <div className="mx-auto mb-10 flex items-center justify-center text-3xl font-bold text-primary-200">
              Blog Post Per Month
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "none",
                  }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                />
                <Bar dataKey="count" fill="#ccce15" radius={[4, 4, 0, 0]} />{" "}
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </>
  );
}
