"use client";

import Loading from "@/components/common/loading/Loading";
import { FetchApplicationChart } from "@/components/fetch/admin/FetchApplicationChart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

// Interface for the chart data
interface Props {
  course: string;
  _count: number;
}

// Interface for the chart configuration
interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

// Predefined chart configuration with colors for some courses
const chartConfig: ChartConfig = {
  visitors: {
    label: "Visitors",
  },
  "office application": {
    label: "Office Application",
    color: "hsl(var(--chart-5))",
  },
  "database programming": {
    label: "Database Programming",
    color: "hsl(var(--chart-7))",
  },
  "graphics design": {
    label: "Graphics Design",
    color: "hsl(var(--chart-1))",
  },
  "ethical hacking": {
    label: "Ethical Hacking",
    color: "hsl(var(--chart-6))",
  },
  "digital marketing": {
    label: "Digital Marketing",
    color: "hsl(var(--chart-3))",
  },
};

// Function to generate a random color in HSL format
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
}

export default function ApplicationChart() {
  const { isLoading, data, isError } = FetchApplicationChart();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Error loading data...</p>;
  }

  // Generate chart data with dynamic colors
  const chartData = data.groupedResults.map((result: Props) => ({
    course: result.course,
    count: result._count,
    fill: chartConfig[result.course]?.color || getRandomColor(),
  }));

  return (
    <div className=" col-span-1">
      <div className="mx-auto flex items-center justify-center text-3xl font-bold text-primary">
        Application Chart
      </div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="course"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {data.totalApplicationCount}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Applications
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
