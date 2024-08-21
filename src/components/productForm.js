import React, { useState } from "react";
import axios from "axios";

function ProductForm({ onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productData, setProductData] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let parsedData = null;
    try {
      parsedData = productData ? JSON.parse(productData) : null;
    } catch (err) {
      parsedData = null; 
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://adlift-backend.vercel.app/api/products",
        {
          name: productName,
          data: parsedData,
        }
      );

      onAddProduct(response.data); 
      setProductName("");
      setProductData("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while adding the product."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder='Enter product data (e.g., {"color": "White", "capacity": "128 GB"})'
          value={productData}
          onChange={(e) => setProductData(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    width: "200px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "300px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default ProductForm;
