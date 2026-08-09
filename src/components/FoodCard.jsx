import { Link } from "react-router-dom";

function FoodCard({ food, addToCart }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={food.image}
          className="card-img-top"
          alt={food.name}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h5 className="card-title">{food.name}</h5>

          <p className="text-muted">
            {food.category}
          </p>

          <p>{food.description}</p>

          <h5 className="fw-bold">${food.price}</h5>

          <div className="d-flex gap-2">
            <Link
              to={`/menu/${food.id}`}
              className="btn btn-dark"
            >
              View Details
            </Link>

            <button className="btn btn-warning"
            onClick={() => addToCart(food)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;