import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    setCart([]);
    navigate("/order-success");
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center mb-5">
        Checkout
      </h1>

      <div className="row">
        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4">Delivery Information</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Payment Method
                </label>

                <select
                  name="payment"
                  className="form-select"
                  value={form.payment}
                  onChange={handleChange}
                >
                  <option>Cash on Delivery</option>
                  <option>Credit Card</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-warning btn-lg w-100"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h3>Order Summary</h3>

            <hr />

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <h4 className="d-flex justify-content-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;