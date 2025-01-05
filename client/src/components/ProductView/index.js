import React, { useState } from "react";
import { useProductView } from "./useProductView";
import { 
    Button, 
    Card, 
    CardBody, 
    CardImg, 
    CardSubtitle, 
    CardText, 
    CardTitle, 
    Col, 
    FormGroup, 
    Input, 
    Label, 
    Row, 
    Spinner 
} from "reactstrap";
import ProductReview from "../ProductReview";
import { Rating } from "react-simple-star-rating";

const ProductView = ({ token, addToBasket }) => {
    const {
        rating,
        product, 
        getImage,
        setRating,
        description,
        selectedSize,
        selectedColor,
        selectedQuantity,
        setSelectedSize,
        setSelectedColor,
        handleQuantityChange,
        setgetLatestProductUpdate,
    } = useProductView();

    const [isAddingToBasket, setIsAddingToBasket] = useState(false);

    if (!product || !product.attributes) {
        return null;
    }

    const { id, attributes } = product;
    const quantity = Array.from(Array(Number(attributes.quantity)).keys());

    return (
        <div className="product-details mt-5">
            <Row>
                <Col sm="12" md="6">
                    <CardImg
                        top
                        width="100%"
                        src={`http://localhost:1337${getImage(selectedColor)}`}
                        alt=""
                    />
                </Col>
                <Col sm="12" md="6">
                    <CardBody>
                        <CardTitle className="fw-bold pb-2 fs-2">{attributes.name}</CardTitle>
                        <CardText>{attributes.description}</CardText>

                        <div className="rating">
                            <Rating
                                allowFraction
                                readonly
                                size={24}
                                initialValue={rating.stars}
                            />
                            <span>{
                                rating.count > 1
                                ? `${rating.count} ratings`
                                : `${rating.count} rating`
                            }</span>
                        </div>

                        <CardSubtitle>
                            <strong>Price: ${attributes.price}</strong>
                        </CardSubtitle>
                        <CardSubtitle>{attributes.quantity} items left</CardSubtitle>
                        <div>
                            <CardSubtitle>Sizes:</CardSubtitle>
                            <div className="sizes">
                                {attributes.sizes.map((size) => (
                                    <span 
                                        key={size.name} 
                                        className={selectedSize === size.name ? "active" : ""}
                                        onClick={() => setSelectedSize(size.name)}
                                    >
                                        {size.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <CardSubtitle>Color: {selectedColor}</CardSubtitle>
                            <div className="colours">
                                {attributes.colours.map((colour) => (
                                    <span 
                                        key={colour.name} 
                                        className={selectedColor === colour.name ? "active" : ""}
                                        onClick={() => setSelectedColor(colour.name)}
                                    >
                                        <img 
                                            src={`http://localhost:1337${getImage(colour.name)}`} 
                                            alt={colour.name} 
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <FormGroup className="quantity">
                                <Label for="exampleSelect">Quantity</Label>
                                <Input
                                    id="exampleSelect"
                                    name="quantity"
                                    type="select"
                                    value={selectedQuantity}
                                    onChange={handleQuantityChange}
                                >
                                    {quantity.map((number) => (
                                        <option key={number}>{number}</option>
                                    ))}                       
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="d-grid gap-2">
                            <Button 
                                color="outline-danger" 
                                className="p-2 fw-bold"
                                onClick={() => {
                                    setIsAddingToBasket(true);
                                    addToBasket({
                                        ...product,
                                        description,
                                        size: selectedSize,
                                        color: selectedColor,
                                        quantity: selectedQuantity,
                                        imageUrl: getImage(selectedColor),
                                    }).finally(() => setIsAddingToBasket(false));
                                }}
                                disabled={isAddingToBasket}
                            >
                                {isAddingToBasket ? <Spinner size="sm" /> : "Add to basket"}
                            </Button>
                        </div>
                    </CardBody>
                </Col>
            </Row>
            <ProductReview 
                token={token} 
                productId={id} 
                setRating={setRating} 
                setgetLatestProductUpdate={setgetLatestProductUpdate} 
            />
        </div>
    );
};

export default ProductView;
