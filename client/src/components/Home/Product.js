import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Product = ({ product, orderCard }) => {
    const image = orderCard ? {} : product.attributes.images.data[0].attributes;

    // State to track visibility
    const [isVisible, setIsVisible] = useState(false);

    // Scroll animation handler
    const handleScroll = () => {
        const element = document.getElementById(`product-${product.id}`);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
    };

    useEffect(() => {
        const element = document.getElementById(`product-${product.id}`);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                setIsVisible(true);
            }
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check visibility on load

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Card
            id={`product-${product.id}`}
            className={`product-card pt-3 ${isVisible ? "fade-in" : "fade-out"}`}
            style={{ border: "none", backgroundColor: "white", transition: "opacity 0.5s ease-in-out" }}
        >
            <div>
                <CardImg
                    top
                    width="100%"
                    src={`http://localhost:1337${orderCard ? product.imageUrl : image.url}`}
                    alt={image.name}
                />
            </div>
            <div className="pt-3">
                <CardTitle>
                    {orderCard ? product.name : product.attributes.name}
                </CardTitle>
                {orderCard ? (
                    <CardSubtitle className="quantity">
                        <strong>Quantity: {product.quantity}</strong>
                    </CardSubtitle>
                ) : null}
                <CardSubtitle>
                    <h5>
                        ${orderCard ? product.price : product.attributes.price}
                    </h5>
                </CardSubtitle>
            </div>
        </Card>
    );
};

export default Product;