import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation between routes
import { Button, Row, Col } from "reactstrap"; // Reactstrap components for styling
import CustomCard from "./CustomCard"; // A custom card component for displaying product details
import Checkout from "../checkout"; // A component for handling the checkout process

/**
 * Basket Component
 * @param {Object[]} basket - Array of products added to the basket
 * @param {string} token - User's authentication token
 * @param {function} removeFromBasket - Function to remove an item from the basket
 * @param {function} updateBasketItem - Function to update the quantity or details of an item in the basket
 */
const Basket = ({ basket, token, removeFromBasket, updateBasketItem }) => {
    const navigate = useNavigate(); // Hook for navigating between routes

    // Function to navigate to the product details page with query parameters for color and size
    const navigateToProductView = (url) => {
        navigate(url);
    };

    // Calculate the total price of all items in the basket
    const totalPrice = basket.reduce((acc, value) => {
        const itemPrice = Number(value.price) * Number(value.quantity); // Calculate price for each item
        return acc + itemPrice; // Add item price to total
    }, 0);

    return (
        <>
            <div className="basket">
                {/* Display the total price if there are items in the basket */}
                {basket.length ? (
                    <h4 className="fw-bold pb-3">Total price: ${totalPrice.toFixed(2)}</h4>
                ) : null}

                {/* Display all products in the basket */}
                <Row>
                    {basket.map((product, idx) => (
                        <Col
                            sm="12"
                            md="3"
                            key={`${idx}${product.productId}`} // Unique key for each item
                            onClick={() =>
                                navigateToProductView(
                                    `/product-details/${product.productId}?color=${product.color}&size=${product.size}`
                                )
                            }
                        >
                            <CustomCard
                                {...{
                                    ...product, // Pass all product details to the CustomCard component
                                    index: idx,
                                    updateBasketItem, // Function to update the basket item
                                    removeFromBasket, // Function to remove the item from the basket
                                }}
                            />
                        </Col>
                    ))}
                </Row>

                {/* Display the checkout component if there are items in the basket */}
                {basket.length ? <Checkout products={basket} token={token} /> : null}
            </div>

            {/* Display a message and button if the basket is empty */}
            {!basket.length ? (
                <div className="empty-basket">
                    <h3>Basket is empty...</h3>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            navigate("/"); // Navigate to the home page
                        }}
                    >
                        Go Shopping
                    </Button>
                </div>
            ) : null}
        </>
    );
};

export default Basket;
