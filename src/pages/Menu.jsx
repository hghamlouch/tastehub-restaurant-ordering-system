import { useState } from "react";
import foods from "../data/food";
import FoodCard from "../components/FoodCard";

function Menu({ addToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Burger",
    "Pizza",
    "Sides",
    "Drinks",
    "Desserts",
  ];

  const filteredFoods = foods.filter((food) => {
    const matchSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || food.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="menu-page">
      <div className="container py-5">

        {/* Page Title */}
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            TasteHub Menu
          </span>

          <h1 className="fw-bold display-4">
            Our Delicious Menu
          </h1>

          <p className="text-white fs-5">
            Discover your favorite meal and order it in just a few clicks.
          </p>
        </div>

        {/* Search */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-7 col-md-9">
            <input
              type="text"
              className="form-control menu-search shadow-sm"
              placeholder="🔎 Search for your favorite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="text-center mb-5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`btn menu-category-btn me-2 mb-2 ${
                category === item
                  ? "btn-warning"
                  : "btn-light"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Food Cards */}
        <div className="row g-4">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                addToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-12">
              <div className="card shadow text-center p-5">
                <h2>🍽️ No meals found</h2>
                <p className="text-muted mb-0">
                  Try another food name or category.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Menu;