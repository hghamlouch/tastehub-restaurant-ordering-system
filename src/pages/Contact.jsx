function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <div className="contact-page">
      <div className="container py-5">

        <div className="text-center mb-5 text-white">
          <h1 className="fw-bold">Contact Us</h1>
          <p>We would love to hear from you.</p>
        </div>

        <div className="row g-4">
          <div className="col-md-5">
            <div className="card shadow-sm p-4 h-100">
              <h3 className="fw-bold mb-4">Get in Touch</h3>

              <p>
                <strong>📍 Address:</strong><br />
                Beirut, Lebanon
              </p>

              <p>
                <strong>📞 Phone:</strong><br />
                +961 70 123 456
              </p>

              <p>
                <strong>✉️ Email:</strong><br />
                info@tastehub.com
              </p>

              <p>
                <strong>🕒 Opening Hours:</strong><br />
                Monday - Sunday<br />
                10:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          <div className="col-md-7">
            <div className="card shadow-sm p-4">
              <h3 className="fw-bold mb-4">Send a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message subject"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 py-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;