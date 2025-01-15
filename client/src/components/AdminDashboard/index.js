// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Card,
//   CardBody,
//   CardTitle,
//   CardText,
//   Row,
//   Col,
//   Spinner,
// } from "reactstrap";

// const AdminDashboard = () => {
//   // State variables to store total sales, total quantity, and loading status
//   const [totalSales, setTotalSales] = useState(0); // Stores the total sales amount
//   const [totalQuantity, setTotalQuantity] = useState(0); // Stores the total quantity sold
//   const [loading, setLoading] = useState(true); // Tracks whether data is still being loaded

//   useEffect(() => {
//     // This function fetches the order data from the API
//     const fetchOrders = async () => {
//       try {
//         // Send a GET request to the API endpoint to retrieve product data
//         const response = await axios.get(
//           "http://localhost:1337/api/products?populate=orders"
//         );

//         console.log("Full API Response:", response.data); // Log the full API response for debugging

//         // Extract the products from the response data
//         const products = response.data || [];
//         if (!Array.isArray(products)) {
//           // Log an error if the response structure is unexpected
//           console.error("Unexpected API response structure:", products);
//           return;
//         }

//         // Initialize variables to accumulate total sales and quantity
//         let sales = 0;
//         let quantity = 0;

//         // Iterate through the products array
//         products.forEach((product) => {
//           const productOrders = product.orders || []; // Get the orders for each product

//           // Iterate through each order of the product
//           productOrders.forEach((order) => {
//             const nestedOrders = order.orders || []; // Access nested orders if present

//             // Iterate through each nested order to calculate sales and quantity
//             nestedOrders.forEach((nestedOrder) => {
//               sales += (nestedOrder.price || 0) * (nestedOrder.quantity || 0); // Calculate sales
//               quantity += nestedOrder.quantity || 0; // Calculate quantity
//             });
//           });
//         });

//         // Update state with the calculated total sales and quantity
//         setTotalSales(sales);
//         setTotalQuantity(quantity);
//       } catch (error) {
//         // Log an error if there was an issue fetching the orders
//         console.error("Error fetching orders:", error);
//       } finally {
//         // Set loading to false to indicate that data fetching is complete
//         setLoading(false);
//       }
//     };

//     // Call the fetchOrders function when the component is mounted
//     fetchOrders();
//   }, []); // Empty dependency array ensures this runs only once

//   // Render the UI
//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md="6">
//           <Card className="shadow-sm p-3">
//             <CardBody>
//               <CardTitle tag="h3" className="text-center text-danger">
//                 Top Sales
//               </CardTitle>
//               <hr></hr>
//               {loading ? (
//                 // Show a spinner and loading message while data is being fetched
//                 <div className="text-center my-3">
//                   <Spinner color="primary" />
//                   <p>Loading data...</p>
//                 </div>
//               ) : (
//                 // Display total sales and quantity once data is loaded
//                 <>
//                   <CardText className="text-center mt-4">
//                     <strong>Total Sales:</strong> ${totalSales.toFixed(2)}
//                   </CardText>
//                   <CardText className="text-center">
//                     <strong>Total Quantity Sold:</strong> {totalQuantity}
//                   </CardText>
//                 </>
//               )}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AdminDashboard;
