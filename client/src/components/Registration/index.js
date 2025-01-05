import React, { useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { Col, Row, Button, FormGroup, Input, Form, Spinner } from "reactstrap";
import axios from "axios";

const initialUser = { email: "", password: "", username: ""};
const Registration = () => {
    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    const signUp = async() => {
        setLoading(true); // Set loading to true
        try {
            const url = 'http://localhost:1337/api/auth/local/register';
            if (user.username && user.email && user.password) {
                const res = await axios.post(url, user);
                if (res) {
                    setUser(initialUser);
                    navigate("/login");
                }          
            }
        } catch (error) {
            toast.error(error.message, {
                hideProgressBar: true,
            });         
        } finally {
            setLoading(false); // Set loading to false after request
        }
    };

    const handleUserChange = ({target}) => {
        const{name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    };

    return (
        <Row className="register">
            <Col sm="12" md={{size: 4, offset: 4}}>
                <div>
                    <h1 class="text-center mb-5 fw-bold">Create Account</h1>
                    <Form onSubmit={(e) => { e.preventDefault(); signUp(); }}> 
                        <h6>FULL NAME</h6>
                        <FormGroup>
                            <Input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleUserChange}
                            placeholder="Enter your full name"
                            required 
                            />
                        </FormGroup>
                        <h6 className="mt-3">EMAIL</h6>
                        <FormGroup>
                            <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleUserChange}
                            placeholder="Enter your email"
                            required 
                            />
                        </FormGroup>
                        <h6 className="mt-3">PASSWORD</h6>
                        <FormGroup>
                            <Input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleUserChange}
                            placeholder="Enter password"
                            required 
                            />
                        </FormGroup>
                        <div class="d-grid gap-2 pt-3">
                            <Button color="danger" type="submit" disabled={loading}> 
                                {loading ? <Spinner size="sm" /> : 'Sign up'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Col>         
        </Row>
    );
};

export default Registration;
