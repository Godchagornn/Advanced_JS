import "./App.css";
import products from "./data/products";
import ProductCard from "./components/ProductCard";

function App() {
  const availableCount = products.filter(p => p.inStock).length;
  return (
    <div className="app">
      <header className="app-header">
        <h1>Green Garden Shop 🌿</h1>
        <p>{products.length} products | {availableCount} available</p>
      </header>
      <div className="gallery-grid">
        {products.map(product => (
          // TODO: Insert ProductCard component here, passing product data as props
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default App;