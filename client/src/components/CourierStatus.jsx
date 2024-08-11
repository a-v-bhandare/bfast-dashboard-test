import { useEffect, useState } from "react";

export default function CourierStatus({ startDate, endDate }) {
  const [orderCounts, setOrderCounts] = useState({
    pickups: 0,
    inTransit: 0,
    outForDelivery: 0,
    delivered: 0,
    undelivered: 0,
    rtoTransit: 0,
  });

  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const response = await fetch("/api/order/getall");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const orders = await response.json();
        const counts = orders.reduce(
          (acc, order) => {
            switch (order.status) {
              case "Picked Up":
                acc.pickups += 1;
                break;
              case "In Transit":
                acc.inTransit += 1;
                break;
              case "Out for Delivery":
                acc.outForDelivery += 1;
                break;
              case "Delivered":
                acc.delivered += 1;
                break;
              case "Undelivered":
                acc.undelivered += 1;
                break;
              case "RTO Transit":
                acc.rtoTransit += 1;
                break;
              default:
                break;
            }
            return acc;
          },
          {
            pickups: 0,
            inTransit: 0,
            outForDelivery: 0,
            delivered: 0,
            undelivered: 0,
            rtoTransit: 0,
          }
        );
        setOrderCounts(counts);
      } catch (error) {
        console.error("Error fetching order counts:", error);
      }
    };

    fetchOrderCounts();
  }, []);

  return (
    <div className="p-20">
      <div>
        <h1 className="text-2xl text-[#2D286A] font-poppins font-bold">
          COURIER STATUS
        </h1>
      </div>
      <div className="grid grid-cols-6 gap-1 mt-10 font-poppins">
        <div className="bg-[#2D286A] text-white text-center pt-10 pb-10">
          <p className="font-bold text-xs">Pickups</p>
          <p className="font-bold text-3xl mt-2">{orderCounts.pickups}</p>
        </div>
        <div className="bg-[#2D286A] text-white text-center pt-10 pb-10">
          <p className="font-bold text-xs">In Transit</p>
          <p className="font-bold text-3xl mt-2">{orderCounts.inTransit}</p>
        </div>
        <div className="bg-[#2D286A] text-white text-center pt-10 pb-10">
          <p className="font-bold text-xs">Out For Delivery</p>
          <p className="font-bold text-3xl mt-2">
            {orderCounts.outForDelivery}
          </p>
        </div>
        <div className="bg-[#2D286A] text-white text-center pt-10 pb-10">
          <p className="font-bold text-xs">Delivered</p>
          <p className="font-bold text-3xl mt-2">{orderCounts.delivered}</p>
        </div>
        <div className="bg-[#2D286A] text-white text-center pt-10 pb-10">
          <p className="font-bold text-xs">Undelivered</p>
          <p className="font-bold text-3xl mt-2">{orderCounts.undelivered}</p>
        </div>
        <div className="bg-[#2D286A] text-white text-center pt-10 pb-10">
          <p className="font-bold text-xs">RTO Transit</p>
          <p className="font-bold text-3xl mt-2">{orderCounts.rtoTransit}</p>
        </div>
      </div>
    </div>
  );
}
