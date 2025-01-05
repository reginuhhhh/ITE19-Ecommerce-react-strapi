import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Row, Col } from 'reactstrap';
import { useProducts } from './useProducts';

const BranchSelection = () => {
    const navigate = useNavigate();
    const { branches } = useProducts();
    const [selectedBranch, setSelectedBranch] = useState('');

    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
    };

    const handleBranchSelection = () => {
        if (selectedBranch) {
            // Redirect to Home with the selected branch
            navigate(`/home/${selectedBranch}`);
        } else {
            alert("Please select a branch.");
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Select a Branch</h2>
            <Row style={{ justifyContent: 'center' }}>
                <Col sm="6" md="4">
                    <Input type="select" onChange={handleBranchChange} value={selectedBranch}>
                        <option value="">Select a Branch</option>
                        {branches.map((branch, index) => (
                            <option key={index} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </Input>
                </Col>
            </Row>
            <Button onClick={handleBranchSelection} color="primary" style={{ marginTop: '20px' }}>
                Proceed to Products
            </Button>
        </div>
    );
};

export default BranchSelection;
