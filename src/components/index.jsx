import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

const LoadMore = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => {
          const newProducts = result.products.filter(
            (newProduct) =>
              !prevData.some((prevProduct) => prevProduct.id === newProduct.id)
          );
          return [...prevData, ...newProducts];
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) {
      setDisableBtn(true);
    }
  }, [products]);
  if (loading) {
    return <div>Loading data! Please wait!</div>;
  }
  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div key={item.id} className="product">
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button disabled={disableBtn} onClick={() => setCount(count + 1)}>
          Load more
        </button>
        {disableBtn && <p>You've reached the 100th product mark.</p>}
      </div>
    </div>
  );
};

export default LoadMore;
