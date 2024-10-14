"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

const LineGraph = ({
  lineData,
  borderColor,
  gradientColor
}: {
  lineData: number[];
  borderColor: string;gradientColor:string
}) => {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler,
  );
  const data = {
    labels: ["", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Dataset 1",
        data: lineData,
        borderColor,
        borderWidth: 2,
        pointRadius: 0,
        fill: "start",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 90, 180, 300);
          gradient.addColorStop(0, gradientColor);
          gradient.addColorStop(1, gradientColor);
          return gradient;
        },
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          offset: false,
          color: "#22c55e",
        },
      },

      x: {
        position: "bottom" as const,
        ticks: {
          beginAtZero: true,
          font: {
            size: 16,
            weight: "bold" as const,
            color: "black",
          },
        },
        grid: {
          offset: false,
          color: "white",
        },
        border: {
          width: 0,
        },
      },
    },
    elements: {
      line: {
        tension: 1,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
