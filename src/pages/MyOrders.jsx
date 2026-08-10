import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import burgerOrders from "../assets/burger-orders.jpg";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://tastehub-restaurant-ordering-system.onrender.com/api/orders",
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
          setMessage(data.message || "Failed to load orders.");
          return;
        }

        setOrders(data);
      } catch (error) {
        console.error("My Orders Error:", error);
        setMessage("Cannot connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.65)
          ), url(${burgerOrders})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3 className="text-white">Loading orders...</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.55),
          rgba(0, 0, 0, 0.7)
        ), url(${burgerOrders})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingTop: "60px",
        paddingBottom: "80px",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="text-white fw-bold">
            My Orders 🍔
          </h1>

          <p className="text-white">
            Your TasteHub order history
          </p>
        </div>

        {message && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}

        {orders.length === 0 ? (
          <div
            className="card border-0 shadow-lg text-center"
            style={{
              borderRadius: "20px",
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
          >
            <div className="card-body p-5">
              <h4>No orders found.</h4>

              <button
                className="btn btn-warning mt-3"
                onClick={() => navigate("/menu")}
              >
                Browse Menu
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div
                className="col-lg-4 col-md-6"
                key={order.id}
              >
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "rgba(255,255,255,0.95)",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="fw-bold mb-0">
                        Order #{order.id}
                      </h4>

                      <span className="badge bg-warning text-dark">
                        {order.status}
                      </span>
                    </div>

                    <hr />

                    <p>
                      <strong>Total:</strong>{" "}
                      ${Number(order.total).toFixed(2)}
                    </p>

                    <p className="text-muted">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                    <button
                      className="btn btn-dark w-100"
                      onClick={() =>
                        navigate(`/orders/${order.id}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;