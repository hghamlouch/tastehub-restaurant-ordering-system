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

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    let user;

    try {
      user = JSON.parse(savedUser);
    } catch {
      alert("Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const items = cart.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      }));

      const response = await fetch(
        "https://tastehub-restaurant-ordering-system.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            total: total,
            status: "Pending",
            items: items,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create order.");
        return;
      }

      console.log("Created Order:", data);

      if (clearCart) {
        clearCart();
      }

      navigate("/order-success");
    } catch (error) {
      console.error("Checkout Error:", error);

      alert("Cannot connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="mb-4">Order Summary</h3>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="d-flex justify-content-between mb-3"
                    >
                      <div>
                        <strong>{item.name}</strong>
                        <div className="text-muted">
                          Qty: {item.quantity || 1}
                        </div>
                      </div>

                      <span>
                        $
                        {(
                          (Number(item.price) || 0) *
                          (Number(item.quantity) || 1)
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="mb-4">
                Delivery Information
              </h3>

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
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    className="form-control"
                    name="address"
                    rows="4"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading || cart.length === 0}
                >
                  {loading
                    ? "Placing Order..."
                    : "Place Order"}
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