import { useParams, Link } from "react-router-dom";
import foods from "../data/food";

function FoodDetails() {
  const { id } = useParams();

  const food = foods.find(
    (item) => item.id === Number(id)
  );

  if (!food) {
    return (
      <div className="container py-5 text-center">
        <h2>Food Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center">

        <div className="col-md-6 mb-4">
          <img
            src={food.image}
            alt={food.name}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-warning text-dark mb-3">
            {food.category}
          </span>

          <h1 className="fw-bold">
            {food.name}
          </h1>

          <p className="lead text-muted">
            {food.description}
          </p>

          <h2 className="fw-bold mb-4">
            ${food.price}
          </h2>

          <button className="btn btn-warning btn-lg me-2">
            Add to Cart
          </button>

          <Link
            to="/menu"
            className="btn btn-outline-dark btn-lg"
          >
            Back to Menu
          </Link>
        </div>

      </div>
    </div>
  );
}

export default FoodDetails;