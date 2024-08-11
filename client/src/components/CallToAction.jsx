import { Table, Dropdown, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";

export default function CallToAction({ startDate, endDate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

    fetchOrders();
  }, [location.search, startDate, endDate]);

  // const fetchOrders = async () => {
  //     try {
  //         const response = await fetch('/api/order/getall');
  //         if (!response.ok) {
  //             throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setOrders(data);
  //     } catch (error) {
  //         console.error('Error fetching orders:', error);
  //     }
  // };
  
  const fetchOrders = async () => {
    try {
      console.log("MY CONSOLE RESPONSE---------->");
      let apiUrl = `/api/order/getall`;

      // Add date range to the API URL if provided
      if (startDate && endDate) {
        apiUrl += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Optionally, you can filter the orders client-side as well
      const filteredOrders = data.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      });

      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col p-20">
      <div>
        <h1 className="text-2xl text-[#040404] font-poppins font-bold">
          ORDER DETAILS
        </h1>
      </div>

      <div className="flex flex-row justify-between mt-10 font-poppins">
        <div className="flex flex-row gap-10">
          <div>
            <Dropdown label="Status" dismissOnClick={false}>
              <Dropdown.Item>Picked Up</Dropdown.Item>
              <Dropdown.Item>In Transit</Dropdown.Item>
              <Dropdown.Item>Out for Delivery</Dropdown.Item>
              <Dropdown.Item>Delivered</Dropdown.Item>
              <Dropdown.Item>Undelivered</Dropdown.Item>
              <Dropdown.Item>RTO Transit</Dropdown.Item>
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Inactive</Dropdown.Item>
            </Dropdown>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <TextInput
                type="text"
                placeholder="Track by Order ID"
                rightIcon={AiOutlineSearch}
                className="hidden md:inline bg-[#FFBFCE]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="flex flex-row gap-10">
          <div>
            <TbArrowsSort className="text-3xl" />
          </div>

          <div>
            <CiSettings className="text-3xl" />
          </div>

          <div>
            <FiDownload className="text-3xl" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        <Table className="font-poppins min-w-full">
          <Table.Head>
            <Table.HeadCell>Client ID</Table.HeadCell>
            <Table.HeadCell>Client Name</Table.HeadCell>
            <Table.HeadCell>Client Phone No</Table.HeadCell>
            <Table.HeadCell>Client Email</Table.HeadCell>
            <Table.HeadCell>Client Pincode</Table.HeadCell>
            <Table.HeadCell>Client Address</Table.HeadCell>
            <Table.HeadCell>Parcel Weight</Table.HeadCell>
            <Table.HeadCell>Length</Table.HeadCell>
            <Table.HeadCell>Breadth</Table.HeadCell>
            <Table.HeadCell>Height</Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Product Amount</Table.HeadCell>
            <Table.HeadCell>Product Quantity</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>Pickup Date</Table.HeadCell>
            <Table.HeadCell>Receiver Name</Table.HeadCell>
            <Table.HeadCell>Receiver Phone No</Table.HeadCell>
            <Table.HeadCell>Receiver Email</Table.HeadCell>
            <Table.HeadCell>Receiver State</Table.HeadCell>
            <Table.HeadCell>Receiver Pincode</Table.HeadCell>
            <Table.HeadCell>Receiver Address</Table.HeadCell>
            <Table.HeadCell>AWB Number</Table.HeadCell>
            <Table.HeadCell>Expected Delivery Date</Table.HeadCell>
            <Table.HeadCell>GPO Price Without GST</Table.HeadCell>
            <Table.HeadCell>GPO Price With GST</Table.HeadCell>
            <Table.HeadCell>AWB</Table.HeadCell>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Delivery Company</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Delivery Date</Table.HeadCell>
            <Table.HeadCell>Days to Deliver</Table.HeadCell>
            <Table.HeadCell>Tracking Link</Table.HeadCell>
            <Table.HeadCell>Dispatch Information Sent</Table.HeadCell>
            <Table.HeadCell>Delivery Confirmation</Table.HeadCell>
            <Table.HeadCell>Aggregator Name</Table.HeadCell>
            <Table.HeadCell>Delivery Partner</Table.HeadCell>
            <Table.HeadCell>Price without GST</Table.HeadCell>
            <Table.HeadCell>Price with GST</Table.HeadCell>
            <Table.HeadCell>Estimated Delivery Days</Table.HeadCell>
            <Table.HeadCell>Order Date</Table.HeadCell>
            <Table.HeadCell>Delivery Charge</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order) => (
              <Table.Row
                key={order._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{order.clientId}</Table.Cell>
                <Table.Cell>{order.clientName}</Table.Cell>
                <Table.Cell>{order.clientPhoneNo}</Table.Cell>
                <Table.Cell>{order.clientEmail}</Table.Cell>
                <Table.Cell>{order.clientPincode}</Table.Cell>
                <Table.Cell>{order.clientAddress}</Table.Cell>
                <Table.Cell>{order.parcelWeight}</Table.Cell>
                <Table.Cell>{order.length}</Table.Cell>
                <Table.Cell>{order.breadth}</Table.Cell>
                <Table.Cell>{order.height}</Table.Cell>
                <Table.Cell>{order.productName}</Table.Cell>
                <Table.Cell>{order.productAmount}</Table.Cell>
                <Table.Cell>{order.productQuantity}</Table.Cell>
                <Table.Cell>{order.paymentMethod}</Table.Cell>
                <Table.Cell>
                  {new Date(order.pickupDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{order.receiverName}</Table.Cell>
                <Table.Cell>{order.receiverPhoneNo}</Table.Cell>
                <Table.Cell>{order.receiverEmail}</Table.Cell>
                <Table.Cell>{order.receiverState}</Table.Cell>
                <Table.Cell>{order.receiverPincode}</Table.Cell>
                <Table.Cell>{order.receiverAddress}</Table.Cell>
                <Table.Cell>{order.AWBNumber}</Table.Cell>
                <Table.Cell>
                  {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{order.GPOPriceWithoutGST}</Table.Cell>
                <Table.Cell>{order.GPOPriceWithGST}</Table.Cell>
                <Table.Cell>{order.AWB}</Table.Cell>
                <Table.Cell>{order.orderId}</Table.Cell>
                <Table.Cell>{order.deliveryCompany}</Table.Cell>
                <Table.Cell>
                  {new Date(order.date).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{order.daystoDeliver}</Table.Cell>
                <Table.Cell>{order.trackingLink}</Table.Cell>
                <Table.Cell>{order.dispatchInformationSent}</Table.Cell>
                <Table.Cell>{order.deliveryConfirmation}</Table.Cell>
                <Table.Cell>{order.aggregatorName}</Table.Cell>
                <Table.Cell>{order.deliveryPartner}</Table.Cell>
                <Table.Cell>{order.pricewithoutGST}</Table.Cell>
                <Table.Cell>{order.pricewithGST}</Table.Cell>
                <Table.Cell>{order.estimatedDeliveryDays}</Table.Cell>
                <Table.Cell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{order.deliveryCharge}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
