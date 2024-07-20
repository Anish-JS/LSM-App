"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import { upperCaseTitle } from "@/lib/upper-case-title";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartProps) => {
  // const courseLabel = upperCaseTitle(data.name);
  const dataValues = data.map((dataItem) => {
    const name = upperCaseTitle(dataItem.name);
    return { ...dataItem, name: name };
  });
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dataValues}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
