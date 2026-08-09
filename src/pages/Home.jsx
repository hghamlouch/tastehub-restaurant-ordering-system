import { Link } from "react-router-dom";
import foods from "../data/food";

function Home() {
  const featuredFoods = foods.slice(0, 3);

  return (
    <>
      <section className="hero-section text-white text-center">
        <div className="container">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            Welcome to TasteHub
          </span>

          <h1 className="fw-bold">
            Delicious Food,
            <br />
            Delivered Fast 🍔
          </h1>

          <p className="lead mt-4">
            Discover fresh meals, explore our menu and order your
            favorite food in just a few clicks.
          </p>

          <div className="mt-4">
            <Link
              to="/menu"
              className="btn btn-warning btn-lg px-5 me-2"
            >
              Order Now
            </Link>

            <Link
              to="/about"
              className="btn btn-outline-light btn-lg px-5"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="section-title">Featured Meals</h2>
          <p className="section-subtitle">
            Try some of our most popular meals.
          </p>
        </div>

        <div className="row g-4">
          {featuredFoods.map((food) => (
            <div className="col-md-4" key={food.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={food.image}
                  className="card-img-top"
                  alt={food.name}
                  style={{
                    height: "230px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <span className="badge bg-warning text-dark mb-2">
                    {food.category}
                  </span>

                  <h4 className="fw-bold">
                    {food.name}
                  </h4>

                  <p className="text-muted">
                    {food.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                      ${food.price}
                    </h4>

                    <Link
                      to={`/menu/${food.id}`}
                      className="btn btn-dark"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link
            to="/menu"
            className="btn btn-warning btn-lg px-5"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center">
          <h2 className="section-title">
            Why Choose TasteHub?
          </h2>

          <p className="section-subtitle">
            Great food, reliable delivery and an easy ordering experience.
          </p>
        </div>

        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">🍕</div>
              <h4 className="fw-bold">Fresh Food</h4>
              <p className="text-muted">
                Fresh ingredients prepared carefully every day.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h4 className="fw-bold">Fast Delivery</h4>
              <p className="text-muted">
                Quick and reliable delivery directly to your door.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h4 className="fw-bold">Best Quality</h4>
              <p className="text-muted">
                Delicious meals prepared with quality and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold">
            Hungry Already?
          </h2>

          <p className="lead">
            Browse our menu and find your next favorite meal.
          </p>

          <Link
            to="/menu"
            className="btn btn-warning btn-lg px-5"
          >
            Explore Menu
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;