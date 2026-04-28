function FilterBar({ filter, setFilter }) {
  return (
    <div className="filters">
      <button
        className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "active" ? "filter-btn active-filter" : "filter-btn"}
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className={filter === "completed" ? "filter-btn active-filter" : "filter-btn"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterBar;