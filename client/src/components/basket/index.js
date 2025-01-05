import React from "react";
import { useNavigate } from "react-router-dom";
import  { Button, Row, Col } from "reactstrap";
import CustomCard from "./CustomCard";
import Checkout from "../checkout";

const Basket = ({ basket, token, removeFromBasket, updateBasketItem }) => {
    const navigate = useNavigate();
    const navigateToProductView = (url) => {
        navigate(url);
    };

    const totalPrice = basket.reduce((acc, value) => {
        const itemPrice = Number(value.price) * Number(value.quantity);
        return acc + itemPrice;
    }, 0);

    return (
        <>
        <div className="basket">
            {basket.length ? <h4 className="fw-bold pb-3">Total price: ${totalPrice}</h4> : null}
            <Row>
            {basket.map((product, idx) => (
                <Col
                    sm="12"
                    md="3"
                    key={`${idx}${product.productId}`}
                    onClick={() =>
                        navigateToProductView(
                        `/product-details/${product.productId}?color=${product.color}&size=${product.size}`
                        )
                    }
                >
                    <CustomCard
                        {...{
                            ...product,
                            index: idx,
                            updateBasketItem,
                            removeFromBasket,
                        }}
                    />
                </Col>
            ))}
            </Row>
            {basket.length ? <Checkout products={basket} token={token} /> :null}
        </div>
        {!basket.length ? (
            <div className="empty-basket">
                <h3>Basket is empty...</h3>
                <Button
                    color="outline-danger"
                    onClick={() => {
                        navigate("/");
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