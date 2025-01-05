import React from "react";

import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Label,
    FormGroup,
    Input,
} from "reactstrap";
import { FaTrash } from "react-icons/fa";

const CustomCard = ({ 
    id,
    name, 
    price,
    color,
    size, 
    sizes, 
    index, 
    quantity, 
    imageUrl,
    productId,
    quantities, 
    removeFromBasket,
    updateBasketItem, 
}) => {

    const quantitiesArray = Array.from(Array(Number(quantities || 0)).keys());

    return (
    <Card className="product-card" style={{ backgroundColor: "white", padding: "10px", position: 'relative' }}>
        <div className="">
        <CardImg
          top
          width="100%"
          src={`http://localhost:1337${imageUrl}`}
          alt={name}
        />
        </div>

        <CardTitle><small>{ name }</small></CardTitle>
        <CardSubtitle onClick={(e) => e.stopPropagation()}>
            <FormGroup className="size">
                <Label for="exampleSelect1">Size</Label>
                <Input
                    size="sm"
                    value={size}
                    type="select"
                    name="size"
                    id="exampleSelect"
                    onChange={({ target: { value } }) => {
                        if (value) {
                        updateBasketItem({
                            index,
                            color,
                            size: value,
                            imageUrl,
                            productId,
                            basketItemId: id,
                            quantity,
                        });
                        }
                    }}
                    >
                    {sizes?.map((size) => (
                        <option key={size.name}>{size.name}</option>
                    ))}
                </Input>
            </FormGroup>
        </CardSubtitle>

        <CardSubtitle onClick={(e) => e.stopPropagation()}>
            <FormGroup className="quantity">
                <Label for="exampleSelect">Quantity</Label>
                <Input
                    size="sm"
                    value={quantity}
                    type="select"
                    name="quantity"
                    id="exampleSelect"
                    onChange={({ target: { value } }) => {
                        if (value) {
                            updateBasketItem({
                                index,
                                color,
                                size,
                                imageUrl,
                                productId,
                                basketItemId: id,
                                quantity: Number(value),
                            });
                        }
                    }}
                >
                    {quantitiesArray.map((number) => (
                        <option key={number}>{number}</option>
                    ))}
                </Input>
            </FormGroup>
        </CardSubtitle>
        <CardSubtitle>
            <strong>Price:</strong> ${price}
        </CardSubtitle>

        <div
            style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer', color: 'red' }}
            onClick={(e) => {
                e.stopPropagation();
                removeFromBasket({
                    basketItemId: id,
                    productId,
                    price,
                    color,
                    index,
                    quantity,
                });
            }}
        >
            <small><FaTrash /> remove</small>
        </div>
    </Card>
    );
};

export default CustomCard;
