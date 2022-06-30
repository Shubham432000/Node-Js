import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });

    result = await result.json();
    console.warn(result);
  };
  return (
    <div className="product">
      <h1> Add Product</h1>

      <input
        type="text"
        placeholder="Enter Product name"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      {error && !name && (
        <span className="invalid-input">Enter Valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter Product price"
        className="inputBox"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid price</span>
      )}
      <input
        type="text"
        placeholder="Enter Product category"
        className="inputBox"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid category</span>
      )}
      <input
        type="text"
        placeholder="Enter Product company"
        className="inputBox"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid company</span>
      )}
      <button className="button" type="button" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
