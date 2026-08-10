import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import burgerOrders from "../assets/burger-orders.jpg";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://tastehub-restaurant-ordering-system.onrender.com/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        if (!response.ok) {
          setMessage(data.message || "Failed to load order.");
          return;
        }

        setOrder(data);
      } catch (error) {
        console.error(error);
        setMessage("Cannot connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.65),
            rgba(0,0,0,0.65)
          ), url(${burgerOrders})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 className="text-white">Loading order...</h3>
      </div>
    );
  }

  if (message) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.65),
            rgba(0,0,0,0.65)
          ), url(${burgerOrders})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "60px",
        }}
      >
        <div className="container">
          <div className="alert alert-danger">
            {message}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.55),
          rgba(0,0,0,0.72)
        ), url(${burgerOrders})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingTop: "60px",
        paddingBottom: "80px",
      }}
    >
      <div className="container">
        <button
          className="btn btn-warning mb-4"
          onClick={() => navigate("/my-orders")}
        >
          ← Back to My Orders
        </button>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "22px",
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
            >
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="fw-bold mb-0">
                    Order #{order.id}
                  </h1>

                  <span className="badge bg-warning text-dark">
                    {order.status}
                  </span>
                </div>

                <p>
                  <strong>Name:</strong> {order.user_name}
                </p>

                <p>
                  <strong>Email:</strong> {order.email}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  ${Number(order.total).toFixed(2)}
                </p>

                <hr />

                <h3 className="fw-bold mb-3">
                  Order Items 🍔
                </h3>

                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center border-bottom py-3"
                    >
                      <div>
                        <h5 className="mb-1">
                          {item.food_name}
                        </h5>

                        <span className="text-muted">
                          Quantity: {item.quantity}
                        </span>
                      </div>

                      <div>
                        <strong>
                          ${Number(item.price).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found.</p>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <h4>Order Total</h4>

                  <h3 className="fw-bold">
                    ${Number(order.total).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;