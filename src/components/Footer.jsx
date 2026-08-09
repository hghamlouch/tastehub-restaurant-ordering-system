import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">

          <div className="col-md-4">
            <h4 className="fw-bold text-warning">
              🍔 TasteHub
            </h4>

            <p className="text-light">
              Fresh meals, easy ordering and fast delivery
              directly to your door.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>

            <div className="d-flex flex-column gap-2">
              <Link className="text-white text-decoration-none" to="/">
                Home
              </Link>

              <Link className="text-white text-decoration-none" to="/menu">
                Menu
              </Link>

              <Link className="text-white text-decoration-none" to="/about">
                About
              </Link>

              <Link className="text-white text-decoration-none" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Contact</h5>

            <p className="mb-1">📍 Beirut, Lebanon</p>
            <p className="mb-1">📞 +961 70 123 456</p>
            <p>✉️ info@tastehub.com</p>
          </div>

        </div>

        <hr className="my-4" />

        <div className="text-center">
          <small>
            © 2026 TasteHub. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;