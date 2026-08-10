import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart = [], clearCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Calculate total
  const total = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return sum + price * quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    // Check delivery information
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    // Check cart
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Get logged-in user
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch (error) {
      localStorage.removeItem("user");
      alert("Please login again.");
      navigate("/login");
      return;
    }

    if (!user || !user.id) {
      alert("Please login again.");
      navigate("/login");
      return;
    }

    const userId = user.id;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: userId,
            total: total,
            status: "Pending",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create order.");
        return;
      }

      console.log("Order created:", data);

      if (clearCart) {
        clearCart();
      }

      navigate("/order-success");
    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        "Cannot connect to backend. Make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow border-0">
            <div className="card-body p-4 p-md-5">

              <h1 className="text-center mb-4">
                Checkout
              </h1>

              <h4 className="mb-3">
                Order Summary
              </h4>

              {cart.length === 0 ? (
                <div className="alert alert-warning">
                  Your cart is empty.
                </div>
              ) : (
                <div className="mb-4">

                  {cart.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <div>
                        <strong>
                          {item.name || item.title || "Food"}
                        </strong>

                        <div className="text-muted">
                          Quantity: {item.quantity || 1}
                        </div>
                      </div>

                      <div>
                        $
                        {(
                          (Number(item.price) || 0) *
                          (Number(item.quantity) || 1)
                        ).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between mt-3">
                    <h4>Total:</h4>

                    <h4>
                      ${total.toFixed(2)}
                    </h4>
                  </div>
                </div>
              )}

              <h4 className="mb-3">
                Delivery Information
              </h4>

              <form onSubmit={handleOrder}>

                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+961 70 123 456"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Delivery Address
                  </label>

                  <textarea
                    className="form-control"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter your delivery address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold"
                  disabled={loading || cart.length === 0}
                >
                  {loading
                    ? "Placing Order..."
                    : `Place Order - $${total.toFixed(2)}`}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;