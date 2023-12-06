import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div>
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            <p>Brand: {product.brand}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Colors: {product.colors.join(', ')}</p>
            <p>Sizes: {product.sizes.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


const Sidebar = ({ categories, colors, brands, onFilterChange, onSortChange }) => {
  return (
    <div className="sidebar">
      <h2>Filters</h2>
      <label>
        Category:
        <select onChange={(e) => onFilterChange('category', e.target.value)}>
          <option value="">All</option>
          {categories && categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Color:
        <select onChange={(e) => onFilterChange('color', e.target.value)}>
          <option value="">All</option>
          {colors && colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>
      <label>
        Brand:
        <select onChange={(e) => onFilterChange('brand', e.target.value)}>
          <option value="">All</option>
          {brands && brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sort By:
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="price">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="alphabetical">Alphabetical Order</option>
          <option value="quantity-asc">Quantity (Low to High)</option>
          <option value="quantity-desc">Quantity (High to Low)</option>
        </select>
      </label>
    </div>
  );
};


const App = () => {
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ category: '', sort: 'price' });

  const categories = ['Dresses', 'Shoes', 'Accessories']; // Add your own categories
  
  const productData = useMemo(() => [
    {
      id: 1,
      name: 'Product 1',
      category: 'Dresses',
      price: 50.0,
      description: 'A beautiful dress for any occasion.',
      brand: 'FashionBrand',
      quantity: 100,
      colors: ['Red', 'Blue'],
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Shoes',
      price: 80.0,
      description: 'Stylish shoes to complement your outfit.',
      brand: 'FootwearCo',
      quantity: 50,
      colors: ['Black', 'Brown'],
      sizes: ['7', '8', '9'],
    },
    {
      id: 3,
      name: 'Product 3',
      category: 'Accessories',
      price: 30.0,
      description: 'Elegant accessories for a finishing touch.',
      brand: 'Accessorize',
      quantity: 75,
      colors: ['Gold', 'Silver'],
      sizes: ['One Size'],
    },
    {
      id: 4,
      name: 'Product 4',
      category: 'Shirts',
      price: 35.0,
      description: 'Casual and comfortable shirts for everyday wear.',
      brand: 'CasualWear',
      quantity: 120,
      colors: ['White', 'Blue', 'Striped'],
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 5,
      name: 'Product 5',
      category: 'Electronics',
      price: 120.0,
      description: 'High-performance electronics for tech enthusiasts.',
      brand: 'TechGadget',
      quantity: 25,
      colors: ['Black'],
      sizes: ['One Size'],
    }
    
  ], []); 
  useEffect(() => {

    setFilteredProducts(productData);

    
    let filtered = [...productData];

    if (activeFilters.category) {
      filtered = filtered.filter((product) => product.category === activeFilters.category);
    }

    if (activeFilters.color) {
      filtered = filtered.filter((product) => product.colors.includes(activeFilters.color));
    }

    if (activeFilters.brand) {
      filtered = filtered.filter((product) => product.brand === activeFilters.brand);
    }

    
    if (activeFilters.sort === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sort === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredProducts(filtered);
  }, [activeFilters, productData]);



  const handleFilterChange = (type, value) => {
    setActiveFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
  };

  const handleSortChange = (value) => {
    setActiveFilters((prevFilters) => ({ ...prevFilters, sort: value }));
  };

  const uniqueColors = Array.from(
    new Set(productData.flatMap((product) => product.colors))
  );

  const uniqueBrands = Array.from(
    new Set(productData.map((product) => product.brand))
  );

  return (
    <div className="App">
      <h1>eCommerce Page</h1>
      <div className="main-container">
        <Sidebar
          categories={categories}
          colors={uniqueColors}
          brands={uniqueBrands}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};
export default App;
