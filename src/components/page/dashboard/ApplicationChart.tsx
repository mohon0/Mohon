"use client";
import Loading from "@/components/common/loading/Loading";
import { FetchApplicationChart } from "@/components/fetch/admin/FetchApplicationChart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ApplicationChart() {
  const { isLoading, data: chartData, isError } = FetchApplicationChart();

  return (
    <div className="mt-20" style={{ color: "white" }}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error fetching chart</div>
      ) : (
        <>
          <div className="mb-10 flex items-center justify-center text-center text-2xl font-bold text-primary md:text-3xl">
            Application Chart
          </div>
          <ResponsiveContainer width="90%" height={350}>
            <BarChart data={chartData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" stroke="#888888" fontSize={12} />
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
              <Bar dataKey="_count" fill="#15ce2c" radius={[4, 4, 0, 0]} />{" "}
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
