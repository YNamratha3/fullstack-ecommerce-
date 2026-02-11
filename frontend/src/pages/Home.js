import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getAllProducts, searchProducts } from '../services/productService';
import { useToast } from '../context/ToastContext';
import './Home.css';

/**
 * Home Page Component
 * Features: Hero Banner, Category Filter, Sorting, Advanced Search
 */
function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters and Sort State
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');

    const { showToast } = useToast();

    // Derived categories from available products
    const categories = ['All', ...new Set(products.map(p => p.category))].filter(Boolean);

    useEffect(() => {
        loadProducts();
    }, []);

    // Filter and Sort Effect
    useEffect(() => {
        let result = [...products];

        // 1. Filter by Category
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // 2. Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Featured/Default order (by ID usually)
                result.sort((a, b) => a.id - b.id);
        }

        setFilteredProducts(result);
    }, [products, activeCategory, sortBy]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            setError('Failed to load products');
            showToast('Failed to load products', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await searchProducts(searchQuery);
            setProducts(data); // Search replaces the base list
            setActiveCategory('All'); // Reset filters
        } catch (err) {
            setError('Search failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">

            <div className="container">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Discover the Future of Shopping</h1>
                        <p className="hero-subtitle">
                            Explore our curated collection of premium electronics, fashion, and more.
                            Quality meets innovation at E-Commerce.
                        </p>
                        <a href="#products" className="hero-btn" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Shop Now
                        </a>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <div id="products-section" className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="🔍 Search for anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>

                {/* Filters Row */}
                <div className="filter-container">
                    <div className="category-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">✨ Featured</option>
                        <option value="price-low">💰 Price: Low to High</option>
                        <option value="price-high">💎 Price: High to Low</option>
                        <option value="name">Aa Name: A-Z</option>
                    </select>
                </div>

                {/* Products Grid */}
                {loading && <div className="loading">Loading products...</div>}

                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="text-center" style={{ padding: '60px', color: '#718096' }}>
                        <h3>No products found 🔍</h3>
                        <p>Try clearing your filters or search query.</p>
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('All');
                                loadProducts();
                            }}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
