import React from "react";
import { Col, Row } from "reactstrap";
import Product from "../Home/Product";

const getDateTime = (string) => {
    const fullDate = new Date(string);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = fullDate.toLocaleDateString(undefined, options);
    const time = fullDate.toLocaleTimeString();
    return `${date} - ${time}`;
};

const Orders = ({ orders }) => {   
    return (
        <div className="orders">
          {orders.length ? (
            <>
              <h2 className="text-center py-3">My orders</h2>
              {orders.map((order) => (
                <div key={order.createdAt}>
                  <h5 className="mt-3">Order date: {getDateTime(order.createdAt)}</h5>
                  <Row>
                    {order.orders.map((product) => (
                      <Col sm="6" md="4" key={product.id}>
                        <Product orderCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </>
          ) : (
            <h3 className="text-center mt-5">You haven't ordered any products yet...</h3>
          )}
        </div>
    );  
};

export default Orders;
