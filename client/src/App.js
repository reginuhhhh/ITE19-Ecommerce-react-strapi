import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "reactstrap";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import CustomNav from "./components/CustomNav";
import { ToastContainer } from "react-toastify";
import ProductView from "./components/ProductView";
import Basket from "./components/basket";
import useBasket from "./components/basket/useBasket";
import { Protector, userData } from "./helpers";
import Orders from "./components/Orders";
import useOrders from "./components/Orders/useOrders";
import Profile from "./components/Profile";

function App() {
  const { jwt, username } = userData();
  const isLoggedIn = !!jwt;
  const { orders, setIsNewOrdersAdded } = useOrders(jwt);
  const { basket, addToBasket, updateBasketItem, removeFromBasket } = useBasket(
    jwt,
    setIsNewOrdersAdded
  );

  return (
    <div>
      <BrowserRouter>
        <CustomNav
          basketItems={basket.length}
          isLoggedIn={isLoggedIn}
          username={username}
        />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/product-details/:id"
              element={<ProductView token={jwt} addToBasket={addToBasket} />}
            />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/orders"
              element={<Protector Component={<Orders orders={orders} />} />}
            />
            <Route
              path="/profile"
              element={<Protector Component={<Profile token={ jwt } />} />}
            />
            <Route
              path="/basket"
              element={
                <Basket
                  token={jwt}
                  basket={basket}
                  updateBasketItem={updateBasketItem}
                  removeFromBasket={removeFromBasket}
                />
              }
            />
          </Routes>
          <ToastContainer />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;