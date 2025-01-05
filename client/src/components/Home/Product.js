import React from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Product = ({ product, orderCard }) => {
    const image = orderCard ? {} : product.attributes.images.data[0].attributes;

    return (
    <Card className="product-card pt-3" style={{ border: "none", backgroundColor: "white" }}>
        <div>
            <CardImg
                top
                width="100%"
                src={`http://localhost:1337${ orderCard ? product.imageUrl : image.url }`}
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
