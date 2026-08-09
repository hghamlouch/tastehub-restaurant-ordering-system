import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="success-page">
      <div className="container py-5 text-center">

        <div
          className="card shadow p-5 mx-auto success-card"
          style={{ maxWidth: "650px" }}
        >
          <div className="success-icon">
            ✅
          </div>

          <h1 className="fw-bold mb-3">
            Order Placed Successfully!
          </h1>

          <p className="lead text-muted">
            Thank you for ordering from TasteHub.
          </p>

          <h4 className="mt-3">
            Your order is being prepared.
          </h4>

          <p className="text-muted mt-3">
            We will prepare your meal and deliver it as soon as possible.
          </p>

          <Link
            to="/"
            className="btn btn-warning btn-lg mt-4 px-5"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;