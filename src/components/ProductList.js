import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

function ProductList({ products }) {
  const [colorFilter, setColorFilter] = useState("");
    const [capacityFilter, setCapacityFilter] = useState("");
    

    console.log("products", products);

  const colors = [
    ...new Set(
      products.flatMap((product) =>
        product.data?.color ? [product.data.color] : []
      )
    ),
  ];

  const capacities = [
    ...new Set(
      products.flatMap((product) =>
        product.data?.capacity ? [product.data.capacity] : []
      )
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const colorMatch = colorFilter ? product.data?.color === colorFilter : true;
    const capacityMatch = capacityFilter
      ? product.data?.capacity === capacityFilter
      : true;
    return colorMatch && capacityMatch;
  });

  const handleColorChange = (e) => {
    setColorFilter(e.target.value);
  };

  const handleCapacityChange = (e) => {
    setCapacityFilter(e.target.value);
  };

  return (
    <div>
      <div style={styles.filterContainer}>
        <div style={styles.filterItem}>
          <label htmlFor="colorFilter">Filter by Color:</label>
          <select
            id="colorFilter"
            value={colorFilter}
            onChange={handleColorChange}
            style={styles.select}
          >
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.filterItem}>
          <label htmlFor="capacityFilter">Filter by Capacity:</label>
          <select
            id="capacityFilter"
            value={capacityFilter}
            onChange={handleCapacityChange}
            style={styles.select}
          >
            <option value="">All Capacities</option>
            {capacities.map((capacity, index) => (
              <option key={index} value={capacity}>
                {capacity}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={styles.productList}>
        {filteredProducts.map((product) => (
          <Card key={product.id} style={styles.card}>
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.data?.color && `Color: ${product.data.color}`}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.data?.capacity && `Capacity: ${product.data.capacity}`}
              </Typography>
              {!product.data && (
                <Typography variant="body2" color="textSecondary">
                  Data: N/A
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const styles = {
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
        borderRadius: "5px",
    gap:"5px",
    alignItems: "center",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
  },
  select: {
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    margin: "20px",
  },
};

export default ProductList;
