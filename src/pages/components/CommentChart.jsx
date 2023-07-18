import { Chart } from "primereact/chart";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

CommentChart.propTypes = {
  comments: PropTypes.array,
  isLoaded: PropTypes.bool,
};

export default function CommentChart({ comments, isLoaded }) {
  const [chartDatas, setChartDatas] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartLoading, setChartLoading] = useState(true)

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: comments.map((comment) => comment.name),
      datasets: [
        {
          label: "Word count",
          data: comments.map((comment) => comment.wordCount),
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartDatas(data);
    setChartOptions(options);
    setChartLoading(false)
  }, [comments]);

  return (
    <div className="card w-6">
      <Card title="LineChart">
        {isLoaded && !chartLoading ? (
          <Chart type="line" data={chartDatas} options={chartOptions} />
        ) : (
          <ProgressSpinner />
        )}
      </Card>
    </div>
  );
}
