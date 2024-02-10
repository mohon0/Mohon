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
      {" "}
      {/* Adjust text color for dark background */}
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error fetching chart</div>
      ) : (
        <>
          <div className="mx-auto mb-20 flex items-center justify-center text-3xl font-bold text-primary-200">
            Application Chart
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="course" // Assuming 'course' as the category for X-Axis
                stroke="#888888"
                fontSize={12}
              />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.1)" }} // Adjust cursor color for tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "none",
                }} // Adjust tooltip background and border
                labelStyle={{ color: "white" }} // Adjust tooltip label color
                itemStyle={{ color: "white" }} // Adjust tooltip item color
              />
              <Bar dataKey="_count" fill="#4caf50" radius={[4, 4, 0, 0]} />{" "}
              {/* Adjust bar color */}
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
