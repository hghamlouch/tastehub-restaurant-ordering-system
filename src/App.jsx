import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    const existingFood = cart.find(
      (item) => item.id === food.id
    );

    if (existingFood) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }

    alert(food.name + " added to cart!");
  };

  return (
    <BrowserRouter>
      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={<Menu addToCart={addToCart} />}
        />

        <Route
          path="/menu/:id"
          element={
            <FoodDetails addToCart={addToCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;