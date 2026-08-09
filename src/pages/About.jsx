import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      <div className="container py-5">

        <div className="text-center text-white mb-5">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            About TasteHub
          </span>

          <h1 className="display-4 fw-bold">
            More Than Just Great Food
          </h1>

          <p className="lead">
            Making restaurant ordering simple, fast and enjoyable.
          </p>
        </div>

        <div className="about-content">

          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                alt="TasteHub Restaurant"
                className="img-fluid about-image"
              />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">
                Our Story 🍽️
              </h2>

              <p className="text-muted fs-5">
                TasteHub is a modern restaurant ordering system
                designed to provide customers with an easy and
                enjoyable way to order their favorite meals.
              </p>

              <p className="text-muted">
                Customers can explore our menu, search for meals,
                view food details, add items to the cart and complete
                their orders through a simple checkout process.
              </p>

              <Link
                to="/menu"
                className="btn btn-warning btn-lg mt-3 px-4"
              >
                Explore Our Menu
              </Link>
            </div>
          </div>

          <hr className="my-5" />

          <div className="text-center mb-4">
            <h2 className="fw-bold">
              What Makes Us Special?
            </h2>

            <p className="text-muted">
              Everything we do is focused on quality and convenience.
            </p>
          </div>

          <div className="row g-4 text-center">

            <div className="col-md-3 col-6">
              <div className="about-feature">
                <div className="about-icon">🥗</div>
                <h5 className="fw-bold">Fresh Food</h5>
                <p className="text-muted">
                  Quality ingredients every day.
                </p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="about-feature">
                <div className="about-icon">🚚</div>
                <h5 className="fw-bold">Fast Delivery</h5>
                <p className="text-muted">
                  Quick delivery to your door.
                </p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="about-feature">
                <div className="about-icon">💻</div>
                <h5 className="fw-bold">Easy Ordering</h5>
                <p className="text-muted">
                  A simple online experience.
                </p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="about-feature">
                <div className="about-icon">⭐</div>
                <h5 className="fw-bold">Best Quality</h5>
                <p className="text-muted">
                  Meals prepared with care.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default About;