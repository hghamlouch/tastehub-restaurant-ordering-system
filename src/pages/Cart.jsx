import { Link } from "react-router-dom";

function Cart({ cart, setCart }) {
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container py-5 text-center">
            <div className="card shadow p-5 mx-auto" style={{ maxWidth: "650px"}}>
        <h1 className="fw-bold">Your Cart 🛒</h1>
        <p className="lead text-muted">Your cart is empty.</p>
      </div>
      </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Your Cart 🛒</h1>

      {cart.map((item) => (
        <div key={item.id} className="card mb-3 shadow-sm">
          <div className="row g-0 align-items-center">
            <div className="col-md-3">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded-start"
                style={{
                  height: "170px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-md-9">
              <div className="card-body">
                <h4>{item.name}</h4>

                <p>
                  ${item.price} × {item.quantity}
                </p>

                <div className="d-flex gap-2 align-items-center">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="text-end mt-4">
        <h2>Total: ${total.toFixed(2)}</h2>

        <Link
            to="/checkout"
            className="btn btn-warning btn-lg mt-2">
                Proceed to Checkout
            </Link>
      </div>
    </div>
  );
}

export default Cart;