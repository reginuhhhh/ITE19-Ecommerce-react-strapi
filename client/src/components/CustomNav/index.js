import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import { FaShoppingBasket } from "react-icons/fa";

const CustomNav = ({ basketItems, isLoggedIn, username }) => {
    const [isOpen, setisOpen] = useState(false);
    const toggle = () => setisOpen(!isOpen);

const loginLogout = isLoggedIn ? (
    <NavLink tag={Link} to="/logout">Logout</NavLink>
  ) : (
    <NavLink tag={Link} to="/login" >Login</NavLink>
  );  

    return (
    <div className='custom-nav'>
    <Navbar color="light" light expand="md" container>
      <NavbarBrand tag={Link} to="/" className="me-auto text-danger fw-semibold">
        P E N S H O P P E
      </NavbarBrand>
      <NavbarToggler onClick={toggle} className="me-2" />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>

        <UncontrolledDropdown nav inNavbar>
              {isLoggedIn ? (
                <>
                  <DropdownToggle nav caret className='fs-5'>
                   {username}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>My account</DropdownItem>
                    <DropdownItem>
                      <NavLink tag={ Link } to="/profile" >
                        My Profile
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={Link} to="/orders">
                        My orders
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{loginLogout}</DropdownItem>
                  </DropdownMenu>
                </>
              ) : (
                loginLogout
              )}
            </UncontrolledDropdown>

          <NavItem>
            <NavLink tag={Link} to="/basket" className="basket-icon-wrapper">
              <span className="basket-items">{basketItems}</span>
              <FaShoppingBasket className="basket-icon fs-5 mb-3" />
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
    </div>
    );
};

export default CustomNav;