import RatingStars from "./RatingStars"

function ProductCard({
    name,
    price,
    discount = 0,
    rating,
    reviews,
    inStock,
    category,
    image,
    description
}) {

    const finalPrice = price - (price * discount / 100);

    function handleAddToCart() {
        if (inStock) {
            alert(`Added "${name}" to cart! Price: $${finalPrice.toFixed(2)}`);
        }
    }

    return (
        <div className={`product-card${!inStock ? " unavailable" : ""}`}>

            <div className={`badge ${inStock ? "badge-green" : "badge-red"}`}>
                {inStock ? "In Stock" : "Out of Stock"}
            </div>

            {discount > 0 && (
                <div className="discount-badge">
                    -{discount}%
                </div>
            )}

            <img src={image} alt={name} className="product-img" />
            <span className="category">{category}</span>
            <h3>{name}</h3>
            <RatingStars rating={rating} reviews={reviews} />

            <p className="description">
                {description}
            </p>

            <div className="card-footer">

                <div className="price-group">
                    {discount > 0 ? (
                        <>
                            <span className="old-price">
                                ${price.toFixed(2)}
                            </span>
                            <strong className="price">
                                ${finalPrice.toFixed(2)}
                            </strong>
                        </>
                    ) : (
                        <strong className="price">
                            ${price.toFixed(2)}
                        </strong>
                    )}
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="add-btn"
                >
                    {inStock ? "Add to Cart" : "Unavailable"}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;