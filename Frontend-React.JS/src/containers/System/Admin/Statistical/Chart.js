import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getBookingDataAndDoctor } from "../../../../services/userService";

export function ColumnChart({ currentYear }) {
  const [monthData, setMonthData] = useState(null);

  useEffect(() => {
    const fetchDataForAllMonths = async () => {
      const promises = Array.from({ length: 12 }, (_, i) => getBookingDataAndDoctor(currentYear, i + 1));
      
      try {
        const results = await Promise.all(promises);
        const data = results.map(result => ({
          doneBooking: result.doneBooking,
          cancelBooking: result.cancelBooking
        }));
        setMonthData(data);
      } catch (error) {
        console.error("Error fetching data for all months:", error);
      }
    };

    fetchDataForAllMonths();
  }, [currentYear]); // Call fetchDataForAllMonths() when currentYear changes

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ];

  const data = [
    ["Tháng", "Hoàn thành", "Hủy"],
    ...(monthData ? monthData.map((month, index) => [
      months[index],
      month ? month.doneBooking : 0,
      month ? month.cancelBooking : 0
    ]) : [])
  ];
  

  const options = {
    title: `Biểu đồ đặt lịch hàng tháng năm ${currentYear}`,
    vAxis: { title: "Bookings" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
