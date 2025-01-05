import React, {useState} from "react";
import { Col, Row, Button, FormGroup, Input, Form, Spinner } from "reactstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";

const initialUser = {password: "", identifier: ""};

const Login = () => {
    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    //para maka type sa form
    const handleChange = ({target}) => {
        const {name, value} = target;
        setUser((currenUser) => ({
            ...currenUser,
            [name]: value,
        }));
    };

    //make communication with the api
    const handleLogin = async () => {
        const url = 'http://localhost:1337/api/auth/local';
        setLoading(true); // Set loading to true
        try{
            if (user.identifier && user.password) {
                const { data } = await axios.post(url, user);
                if (data.jwt) {
                    storeUser(data);
                    toast.success('Logged in successfully!', {
                        hideProgressBar: true,
                    });
                    setUser(initialUser);
                    navigate("/");
                    window.location.reload();
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

    return (
        <Row className="login">
            <Col sm="12" md={{size: 4, offset: 4}}>
                <div>
                    <h1 class="text-center mb-5 fw-bold">Login</h1>
                    <Form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}> 
                        <h6>EMAIL</h6>
                        <FormGroup>
                            <Input
                            name="identifier"
                            value={user.identifier}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            type="email"
                            required 
                            />
                        </FormGroup>
                        <h6 className="mt-3">PASSWORD</h6>
                        <FormGroup>
                            <Input
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            type="password"
                            required 
                            />
                        </FormGroup>
                        <div class="d-grid gap-2 pt-3">
                            <Button color="danger" type="submit" disabled={loading}> 
                                {loading ? <Spinner size="sm" /> : 'Login'}
                            </Button>
                        </div>
                    </Form>
                    <h6>
                        Don't have an account? <Link to='/registration'>create an account</Link>
                    </h6>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
