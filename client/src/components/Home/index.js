import React, { useState } from "react";
import { useProducts } from "./useProducts";
import { Col, Row, Input } from "reactstrap";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSort } from "react-icons/fa";

const Home = () => {
    const { categories, products } = useProducts();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [sortOption, setSortOption] = useState('');

    const priceRanges = [
        { label: "All Prices", value: "" },
        { label: "$1 - $10", value: "1-10" },
        { label: "$11 - $20", value: "11-20" },
        { label: "$21 - $30", value: "21-30" },
        { label: "$31 and above", value: "31-" }
    ];

    const sortOptions = [
        { label: "Featured", value: "featured" },
        { label: "Best selling", value: "best-selling" },
        { label: "Alphabetically, A-Z", value: "name-asc" },
        { label: "Alphabetically, Z-A", value: "name-desc" },
        { label: "Price, low to high", value: "price-asc" },
        { label: "Price, high to low", value: "price-desc" },
        { label: "Date, old to new", value: "date-asc" },
        { label: "Date, new to old", value: "date-desc" }
    ];

    const navigateToProductView = (url) => {
        navigate(url);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filterByPriceRange = (product) => {
        const price = product.attributes.price;
        if (!selectedPriceRange) return true;
        const [min, max] = selectedPriceRange.split("-").map(Number);
        return (!min || price >= min) && (!max || price <= max);
    };

    const sortProducts = (products) => {
        if (sortOption === "best-selling") {
            return [...products].sort((a, b) => b.attributes.sales - a.attributes.sales);
        } else if (sortOption === "name-asc") {
            return [...products].sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        } else if (sortOption === "name-desc") {
            return [...products].sort((a, b) => b.attributes.name.localeCompare(a.attributes.name));
        } else if (sortOption === "price-asc") {
            return [...products].sort((a, b) => a.attributes.price - b.attributes.price);
        } else if (sortOption === "price-desc") {
            return [...products].sort((a, b) => b.attributes.price - a.attributes.price);
        } else if (sortOption === "date-asc") {
            return [...products].sort((a, b) => new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt));
        } else if (sortOption === "date-desc") {
            return [...products].sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
        }
        return products;
    };

    return (
        <div>
            <div className="home">
                <h2 style={{ textAlign: "center" }}>Enjoy our sales!</h2>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "20px",
                    }}
                >
                    {/* Search Bar */}
                    <div style={{ display: "flex", alignItems: "center", flex: "2" }}>
                        <FaSearch style={{ marginRight: "10px" }} />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Category Selector */}
                    <Input
                        type="select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        style={{ flex: "1" }}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.attributes.name}
                            </option>
                        ))}
                    </Input>

                    {/* Price Range Selector */}
                    <Input
                        type="select"
                        value={selectedPriceRange}
                        onChange={handlePriceRangeChange}
                        style={{ flex: "1" }}
                    >
                        {priceRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </Input>

                    {/* Sorting Dropdown */}
                    <FaSort />
                    <Input
                        type="select"
                        value={sortOption}
                        onChange={handleSortChange}
                        style={{ flex: "1" }}
                    >
                        <option value="">Sort by</option>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Input>
                </div>
                {
                    categories.length > 0 && categories.map((category) => {
                        const filteredProducts = products.filter(
                            (product) => product?.attributes?.category?.data?.id === category?.id &&
                                product.attributes.name.toLowerCase().includes(searchTerm) &&
                                filterByPriceRange(product)
                        );

                        const sortedProducts = sortProducts(filteredProducts);

                        return sortedProducts && sortedProducts.length && (!selectedCategory || selectedCategory == category.id) ? (
                            <div key={category.id}>
                                <h2 className="category-title">{category.attributes.name}</h2>
                                <Row key={category.id} className="category">
                                    {sortedProducts.map((product) => (
                                        <Col sm="12" md="3" key={product.id} onClick={() => navigateToProductView(`/product-details/${product.id}`)}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ) : null;
                    })}
            </div>
        </div>
    );
};

export default Home;
