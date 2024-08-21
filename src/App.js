import React, { useState, useEffect } from "react";
import "./App.css";
import ProductForm from "./components/productForm";
import ProductList from "./components/ProductList";
import ProductCharts from "./components/ProductCharts";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/getAll")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="App">
      <h1>Product Listing with Charts</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList products={products} />
      <ProductCharts products={products} />
    </div>
  );
}

export default App;
