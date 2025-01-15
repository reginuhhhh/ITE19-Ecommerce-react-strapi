import React, { useState } from "react";
import {
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    Label,
    FormGroup,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
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

    // State for fade-out effect and modal visibility
    const [isRemoving, setIsRemoving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const quantitiesArray = Array.from(Array(Number(quantities || 0)).keys());

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleRemove = () => {
        setIsRemoving(true); // Trigger fade-out animation
        
        // Delay the actual removal to let the animation play
        setTimeout(() => {
            removeFromBasket({
                basketItemId: id,
                productId,
                price,
                color,
                index,
                quantity,
            });
            setModalOpen(false); // Close modal after removal
        }, 500); // Matches CSS animation duration
    };

    return (
    <>
        {/* Confirmation Modal */}
        <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Confirm Removal</ModalHeader>
            <ModalBody>
                Are you sure you want to remove <strong>{name}</strong> from the basket?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleRemove}>
                    Yes, Remove
                </Button>{' '}
                <Button color="secondary" onClick={toggleModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>

        {/* Product Card */}
        <Card 
            className={`product-card ${isRemoving ? "fade-out" : ""}`}
            style={{ backgroundColor: "white", padding: "10px", position: 'relative' }}
        >
            <div className="">
                <CardImg
                    top
                    width="100%"
                    src={`http://localhost:1337${imageUrl}`}
                    alt={name}
                />
            </div>

            <CardTitle className="py-3"><small>{ name }</small></CardTitle>
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

            {/* Remove button triggers the modal */}
            <div
                style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer', color: 'red' }}
                onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(true); // Open modal for confirmation
                }}
            >
                <small><FaTrash /> remove</small>
            </div>
        </Card>
    </>
    );
};

export default CustomCard;
