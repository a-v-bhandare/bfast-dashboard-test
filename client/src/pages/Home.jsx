import CallToAction from "../components/CallToAction.jsx";
import { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import CourierStatus from "../components/CourierStatus";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [statistics, setStatistics] = useState({
    totalCouriers: 0,
    totalCost: 0,
    avgDailyCouriers: 0,
    avgDeliveryTime: 0,
    avgCourierCost: 0,
  });

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `/api/order/getall?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const orders = await response.json();

        // Calculate statistics based on filtered orders
        const totalCouriers = orders.length;
        const totalCost = orders.reduce(
          (acc, order) => acc + order.pricewithGST,
          0
        );
        const avgDailyCouriers =
          totalCouriers / ((endDate - startDate) / (1000 * 3600 * 24));
        const avgDeliveryTime =
          orders.reduce((acc, order) => acc + order.daystoDeliver, 0) /
          totalCouriers;
        const avgCourierCost = totalCost / totalCouriers;

        setStatistics({
          totalCouriers,
          totalCost,
          avgDailyCouriers,
          avgDeliveryTime,
          avgCourierCost,
        });

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [startDate, endDate]);

  const handleSelect = (date) => {
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
  };

  return (
    <div id="home">
      <div className="flex flex-col justify-between p-24">
        <div className="flex flex-row max-sm:flex-col justify-between">
          <h1 className="text-2xl text-[#2D286A] font-poppins font-bold">
            OVERVIEW
          </h1>

          <div className="flex items-center">
            <div className="relative">
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                className=" text-sm rounded-lg w-full"
              />
            </div>
            {/* <span className="mx-4 text-[#ED1B4A]">to</span>
            <div className="relative">
              <Datepicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Select date end"
                className="bg-[#2D286A] text-gray-900 text-sm rounded-lg block w-full dark:placeholder-gray-400 dark:text-white"
              />
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-20 mt-10 font-poppins">
          <div className="bg-[#2D286A]  text-center pt-10 pb-10 rounded-xl">
            <p className="font-bold text-xs text-white">Total Couriers</p>
            <p className="font-bold text-3xl text-[#ED1B4A] mt-2">
              {statistics.totalCouriers || "0"}
            </p>
          </div>
          <div className="bg-[#2D286A] text-center pt-10 pb-10 rounded-xl">
            <p className="font-bold text-xs text-white">Total Cost</p>
            <p className="font-bold text-3xl text-[#ED1B4A] mt-2">
              {statistics.totalCost || "0"}
            </p>
          </div>
          <div className="bg-[#2D286A] text-center pt-10 pb-10 rounded-xl">
            <p className="font-bold text-xs text-white">Avg Daily Couriers</p>
            <p className="font-bold text-3xl text-[#ED1B4A] mt-2">
              {statistics.avgDailyCouriers.toFixed(2) || "0"}
            </p>
          </div>
          <div className="bg-[#2D286A] text-center pt-10 pb-10 rounded-xl">
            <p className="font-bold text-xs text-white">
              Avg Delivery Time (D)
            </p>
            <p className="font-bold text-3xl text-[#ED1B4A] mt-2">
              {statistics.avgDeliveryTime.toFixed(2) || "0"}
            </p>
          </div>
          <div className="bg-[#2D286A] text-center pt-10 pb-10 rounded-xl">
            <p className="font-bold text-xs text-white">Avg Courier Cost</p>
            <p className="font-bold text-3xl text-[#ED1B4A] mt-2">
              {statistics.avgCourierCost.toFixed(2) || "0"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <CourierStatus startDate={startDate} endDate={endDate} />
      </div>

      <div className="p-4">
        <CallToAction startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
