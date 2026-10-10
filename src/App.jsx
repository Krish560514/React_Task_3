
import { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return <header className="header">Amazon Product Store</header>;
}

function ProductCard(props) {
  const totalAmount = props.quantity * props.price;

  return (
    <section className="product-card">
      <div className="product-image">
        <img
          src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop"
          alt="Wireless Mouse"
        />
      </div>

      <div className="product-details">
        <h2>{props.productName}</h2>

        <p className="price">
          ₹{props.price} <span>per item</span>
        </p>

        <p>Colour: {props.selectedColor}</p>
        <p>Deliver to: {props.deliveryCity || "Not specified"}</p>

        <hr />

        <p>Cart Quantity: {props.quantity}</p>
        <p className="total">Total Amount: ₹{totalAmount}</p>

        <p className="cart-message">
          {props.quantity === 0
            ? "Cart is empty"
            : "Product added to cart"}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Amazon Product Store
    </footer>
  );
}

export default function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  useEffect(() => {
    document.title =
      "Wireless Mouse | " + selectedColor + " | Cart: " + quantity;
  }, [quantity, selectedColor]);

  const handleAdd = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
  };

  const handleRemove = () => {
    setQuantity((previousQuantity) =>
      Math.max(0, previousQuantity - 1)
    );
  };

  const handleReset = () => {
    setQuantity(0);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleCityChange = (event) => {
    setDeliveryCity(event.target.value);
  };

  const handleToggleProduct = () => {
    setShowProduct((previousValue) => !previousValue);
  };

  return (
    <div className="app">
      <Header />

      <div className="tab-info">
        Tab title&nbsp; Wireless Mouse | {selectedColor} | Cart: {quantity}
      </div>

      <main className="main-content">
        {showProduct && (
          <ProductCard
            productName="Wireless Mouse"
            price={499}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}

        <div className="controls">
          <div className="form-group">
            <label htmlFor="productColor">Product colour</label>

            <select
              id="productColor"
              value={selectedColor}
              onChange={handleColorChange}
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="deliveryCity">Delivery city</label>

            <input
              id="deliveryCity"
              type="text"
              value={deliveryCity}
              onChange={handleCityChange}
              placeholder="Enter delivery city"
            />
          </div>
        </div>

        <div className="button-group">
          <button className="add-button" onClick={handleAdd}>
            Add to Cart
          </button>

          <button
            className="remove-button"
            onClick={handleRemove}
            disabled={quantity === 0}
          >
            Remove One
          </button>

          <button className="reset-button" onClick={handleReset}>
            Reset Cart
          </button>

          <button className="toggle-button" onClick={handleToggleProduct}>
            {showProduct ? "Hide Product" : "Show Product"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
