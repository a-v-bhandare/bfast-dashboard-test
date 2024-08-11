import { Table, Dropdown, TextInput, Label, Button } from "flowbite-react";
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";


export default function DashOrders() {

    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        clientId: "",
        clientName: "",
        clientPhoneNo: "",
        clientEmail: "",
        clientPincode: "",
        clientAddress: "",
        parcelWeight: 0,
        length: 0,
        breadth: 0,
        height: 0,
        productName: "",
        productAmount: 0,
        productQuantity: 0,
        paymentMethod: "",
        pickupDate: "",
        receiverName: "",
        receiverPhoneNo: "",
        receiverEmail: "",
        receiverState: "",
        receiverPincode: "",
        receiverAddress: "",
        AWBNumber: "",
        expectedDeliveryDate: "",
        GPOPriceWithoutGST: 0,
        GPOPriceWithGST: 0,
        AWB: "",
        orderId: "",
        deliveryCompany: "",
        date: "",
        status: "",
        deliveryDate: "",
        daystoDeliver: 0,
        trackingLink: "",
        dispatchInformationSent: "",
        deliveryConfirmation: "",
        aggregatorName: "",
        deliveryPartner: "",
        pricewithoutGST: 0,
        pricewithGST: 0,
        estimatedDeliveryDays: 0,
        orderDate: "",
        deliveryCharge: 0,
    })

    const [orders, setOrders] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }

        fetchOrders();
    }, [location.search]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/order/getall', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddClick = async () => {
        try {
           
            const response = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setOrders([...orders, data]);
                setFormData({
                    clientId: "",
                    clientName: "",
                    clientPhoneNo: "",
                    clientEmail: "",
                    clientPincode: "",
                    clientAddress: "",
                    parcelWeight: 0,
                    length: 0,
                    breadth: 0,
                    height: 0,
                    productName: "",
                    productAmount: 0,
                    productQuantity: 0,
                    paymentMethod: "",
                    pickupDate: "",
                    receiverName: "",
                    receiverPhoneNo: "",
                    receiverEmail: "",
                    receiverState: "",
                    receiverPincode: "",
                    receiverAddress: "",
                    AWBNumber: "",
                    expectedDeliveryDate: "",
                    GPOPriceWithoutGST: 0,
                    GPOPriceWithGST: 0,
                    AWB: "",
                    orderId: "",
                    deliveryCompany: "",
                    date: "",
                    status: "",
                    deliveryDate: "",
                    daystoDeliver: 0,
                    trackingLink: "",
                    dispatchInformationSent: "",
                    deliveryConfirmation: "",
                    aggregatorName: "",
                    deliveryPartner: "",
                    pricewithoutGST: 0,
                    pricewithGST: 0,
                    estimatedDeliveryDays: 0,
                    orderDate: "",
                    deliveryCharge: 0,
                });
                fetchOrders();
            } else {
                console.error('Failed to add order:', data.message);
            }

        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    // const handleEditClick = async (orderId) => {
    //     setIsUpdate(true);
    //     const orderToEdit = orders.find(order => order._id === orderId);
    //     if (orderToEdit) {
    //         setFormData({
    //             orderDate: orderToEdit.orderDate,
    //             orderId: orderToEdit.orderId,
    //             status: orderToEdit.status,
    //             deliveryDate: orderToEdit.deliveryDate,
    //             deliveryCharge: orderToEdit.deliveryCharge,
    //             _id: orderToEdit._id
    //         });
    //     }
    // };

    const handleEditClick = async (orderId) => {
        setIsUpdate(true);
        const orderToEdit = orders.find(order => order._id === orderId);
        if (orderToEdit) {
            setFormData(orderToEdit);
        }
    };

    const handleUpdateOrder = async () => {
        try {
            const response = await fetch(`/api/order/update/${formData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setIsUpdate(false);
                setOrders(orders.map(order => (order._id === data._id ? data : order)));
                setFormData({
                    clientId: "",
                    clientName: "",
                    clientPhoneNo: "",
                    clientEmail: "",
                    clientPincode: "",
                    clientAddress: "",
                    parcelWeight: 0,
                    length: 0,
                    breadth: 0,
                    height: 0,
                    productName: "",
                    productAmount: 0,
                    productQuantity: 0,
                    paymentMethod: "",
                    pickupDate: "",
                    receiverName: "",
                    receiverPhoneNo: "",
                    receiverEmail: "",
                    receiverState: "",
                    receiverPincode: "",
                    receiverAddress: "",
                    AWBNumber: "",
                    expectedDeliveryDate: "",
                    GPOPriceWithoutGST: 0,
                    GPOPriceWithGST: 0,
                    AWB: "",
                    orderId: "",
                    deliveryCompany: "",
                    date: "",
                    status: "",
                    deliveryDate: "",
                    daystoDeliver: 0,
                    trackingLink: "",
                    dispatchInformationSent: "",
                    deliveryConfirmation: "",
                    aggregatorName: "",
                    deliveryPartner: "",
                    pricewithoutGST: 0,
                    pricewithGST: 0,
                    estimatedDeliveryDays: 0,
                    orderDate: "",
                    deliveryCharge: 0,
                });
            } else {
                console.error('Failed to update order:', data.message);
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    // const handleDeleteOrder = async (orderId) => {
    //     try {
    //         const response = await fetch(`/api/order/delete/${orderId}`, {
    //             method: 'DELETE',
    //         });
    //         if (response.ok) {
    //             setOrders(orders.filter(order => order._id !== orderId));
    //         } else {
    //             const data = await response.json();
    //             console.error('Failed to delete order:', data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting order:', error);
    //     }
    // };

    return (
        <div className='flex flex-col p-20 w-10/12'>
            <div>
                <h1 className='text-2xl text-[#2D286A] font-poppins font-bold'>ORDER RECORDS</h1>
            </div>

            <div className="flex flex-row justify-between mt-10 font-poppins">
                <div className="flex flex-row gap-10">
                    <div>
                        <Dropdown color="red" label="Status" dismissOnClick={false}>
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
                                type='text'
                                placeholder='Track by Order ID'
                                rightIcon={AiOutlineSearch}
                                className='hidden md:inline bg-[#FFBFCE]'
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
                        <Table.HeadCell>Action</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {orders.map((order) => (
                            <Table.Row key={order._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                                <Table.Cell>{order.pickupDate}</Table.Cell>
                                <Table.Cell>{order.receiverName}</Table.Cell>
                                <Table.Cell>{order.receiverPhoneNo}</Table.Cell>
                                <Table.Cell>{order.receiverEmail}</Table.Cell>
                                <Table.Cell>{order.receiverState}</Table.Cell>
                                <Table.Cell>{order.receiverPincode}</Table.Cell>
                                <Table.Cell>{order.receiverAddress}</Table.Cell>
                                <Table.Cell>{order.AWBNumber}</Table.Cell>
                                <Table.Cell>{order.expectedDeliveryDate}</Table.Cell>
                                <Table.Cell>{order.GPOPriceWithoutGST}</Table.Cell>
                                <Table.Cell>{order.GPOPriceWithGST}</Table.Cell>
                                <Table.Cell>{order.AWB}</Table.Cell>
                                <Table.Cell>{order.orderId}</Table.Cell>
                                <Table.Cell>{order.deliveryCompany}</Table.Cell>
                                <Table.Cell>{order.date}</Table.Cell>
                                <Table.Cell>{order.status}</Table.Cell>
                                <Table.Cell>{order.deliveryDate}</Table.Cell>
                                <Table.Cell>{order.daystoDeliver}</Table.Cell>
                                <Table.Cell>{order.trackingLink}</Table.Cell>
                                <Table.Cell>{order.dispatchInformationSent}</Table.Cell>
                                <Table.Cell>{order.deliveryConfirmation}</Table.Cell>
                                <Table.Cell>{order.aggregatorName}</Table.Cell>
                                <Table.Cell>{order.deliveryPartner}</Table.Cell>
                                <Table.Cell>{order.pricewithoutGST}</Table.Cell>
                                <Table.Cell>{order.pricewithGST}</Table.Cell>
                                <Table.Cell>{order.estimatedDeliveryDays}</Table.Cell>
                                <Table.Cell>{order.orderDate}</Table.Cell>
                                <Table.Cell>{order.deliveryCharge}</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleEditClick(order._id)}>
                                        Edit
                                    </a>
                                    {/* {' | '}
                                    <a href="#" className="font-medium text-red-600 hover:underline dark:text-red-500" onClick={() => handleDeleteOrder(order._id)}>
                                        Delete
                                    </a> */}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Order Date" />
                                    </div>
                                    <TextInput id="base" type="text" sizing="md" value={formData.orderDate} onChange={(e) => handleFormDataChange('orderDate', e.target.value)} />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Order ID" />
                                    </div>
                                    <TextInput id="base" type="text" sizing="md" value={formData.orderId} onChange={(e) => handleFormDataChange('orderId', e.target.value)} />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Status Input" />
                                    </div>
                                    <Dropdown label={formData.status} dismissOnClick={false}>
                                        <Dropdown.Item onClick={() => handleFormDataChange('status', 'Picked Up')}>Picked Up</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleFormDataChange('status', 'In Transit')}>In Transit</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleFormDataChange('status', 'Out for Delivery')}>Out for Delivery</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleFormDataChange('status', 'Delivered')}>Delivered</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleFormDataChange('status', 'Undelivered')}>Undelivered</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleFormDataChange('status', 'RTO Transit')}>RTO Transit</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Delivery Date" />
                                    </div>
                                    <TextInput id="base" type="text" sizing="md" value={formData.deliveryDate} onChange={(e) => handleFormDataChange('deliveryDate', e.target.value)} />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Delivery Charge" />
                                    </div>
                                    <TextInput id="base" type="text" sizing="md" value={formData.deliveryCharge} onChange={(e) => handleFormDataChange('deliveryCharge', e.target.value)} />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Add" />
                                    </div>
                                    {isUpdate ? <Button color="success" onClick={handleUpdateOrder}>Update</Button> :

                                        <Button color="success" onClick={handleAddClick}>Add</Button>
                                    }
                                </div>
                            </Table.Cell>
                        </Table.Row> */}
                    </Table.Body>
                </Table>
            </div>

            <div className='mt-10 w-full'>
                <form onSubmit={isUpdate ? handleUpdateOrder : handleAddClick} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(formData).map(([key, value]) => (
                        key !== '_id' && (
                            <div key={key} className='mb-4'>
                                <Label htmlFor={key} value={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} />
                                <TextInput
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleFormDataChange}
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                                    className="mt-1 block w-full"
                                />
                            </div>
                        )
                    ))}
                    <Button onClick={()=>{handleAddClick()}}>Add</Button>
                </form>
            </div>
        </div>
    )
}