const products = [
    {
        id: 1, 
        name: "Monstera Deliciosa", 
        price: 450.00,
        discount: 20,
        rating: 4.9, 
        reviews: 156, 
        inStock: true, 
        category: "Indoor Plants",
        description: "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a popular indoor plant known for its large, glossy leaves with unique perforations. It thrives in bright, indirect light and requires moderate watering. This tropical beauty adds a touch of greenery and elegance to any space.",
        image: "https://images.pexels.com/photos/6597437/pexels-photo-6597437.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 2, 
        name: "Snake Plant (ลิ้นมังกร)", 
        price: 180.00, 
        discount: 16,
        rating: 4.7, 
        reviews: 89, 
        inStock: true, 
        category: "Air Purifying",
        description: "The Snake Plant, also known as Mother-in-Law's Tongue, is a hardy and low-maintenance plant that is perfect for beginners. It has tall, upright leaves that are variegated with green and yellow stripes. Snake Plants are excellent air purifiers, making them a great addition to any indoor space.",
        image: "https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 3, 
        name: "Philodendron Pink Princess", 
        price: 2500.00, 
        discount: 25,
        rating: 4.5, 
        reviews: 34, 
        inStock: false, 
        category: "Rare Items",
        description: "The Philodendron Pink Princess is a stunning and rare houseplant known for its striking pink variegation on dark green leaves. This tropical beauty thrives in bright, indirect light and requires moderate watering. Due to its rarity and unique appearance, it is highly sought after by plant enthusiasts.",
        image: "https://images.pexels.com/photos/7663986/pexels-photo-7663986.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 4, 
        name: "Cactus Set", 
        price: 299.00, 
        discount: 10,
        rating: 4.8, 
        reviews: 210, 
        inStock: true, 
        category: "Succulents",
        description: "This Cactus Set includes a variety of small, easy-to-care-for cacti that are perfect for adding a touch of greenery to any space. Each cactus has its own unique shape and size, making this set a great choice for both beginners and experienced plant lovers. Cacti thrive in bright light and require minimal watering, making them ideal for busy lifestyles.",
        image: "https://images.pexels.com/photos/1903965/pexels-photo-1903965.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 5, 
        name: "Peace Lily (เดหลี)", 
        price: 220.00, 
        discount: 15,
        rating: 4.6, 
        reviews: 112, 
        inStock: true, 
        category: "Air Purifying",
        description: "The Peace Lily is a popular indoor plant known for its elegant white flowers and glossy green leaves. It thrives in low to medium light conditions and requires regular watering to keep the soil moist. Peace Lilies are excellent air purifiers, making them a great choice for improving indoor air quality while adding a touch of beauty to your home.",
        image: "https://images.pexels.com/photos/12531511/pexels-photo-12531511.jpeg"
    },
    {
        id: 6, 
        name: "Fiddle Leaf Fig (ไทรใบสัก)", 
        price: 850.00, 
        discount: 12,
        rating: 4.4, 
        reviews: 75, 
        inStock: true, 
        category: "Indoor Plants",
        description: "The Fiddle Leaf Fig is a popular indoor plant known for its large, violin-shaped leaves. It thrives in bright, indirect light and requires regular watering to keep the soil consistently moist. This tropical beauty adds a bold statement to any room and is a favorite among interior designers for its dramatic foliage.",
        image: "https://images.pexels.com/photos/12476529/pexels-photo-12476529.jpeg"
    },
    {
        id: 7, 
        name: "Golden Pothos (พลูด่าง)", 
        price: 89.00, 
        discount: 20,
        rating: 4.9, 
        reviews: 420, 
        inStock: true, 
        category: "Easy Care",
        description: "The Golden Pothos is a versatile and easy-to-care-for houseplant that is perfect for beginners. It features heart-shaped leaves with variegated patterns of green and yellow. Golden Pothos thrives in low to bright indirect light and requires minimal watering, making it an ideal choice for busy individuals or those new to plant care.",
        image: "https://images.pexels.com/photos/4641442/pexels-photo-4641442.jpeg"
    },
    {
        id: 8, 
        name: "Calathea Orbifolia", 
        price: 590.00, 
        discount: 15,
        rating: 4.3, 
        reviews: 28, 
        inStock: false, 
        category: "Indoor Plants",
        description: "The Calathea Orbifolia is a stunning indoor plant known for its large, round leaves with striking silver and green stripes. It thrives in low to medium light conditions and requires regular watering to keep the soil consistently moist. This tropical beauty adds a touch of elegance and sophistication to any indoor space, making it a favorite among plant enthusiasts.",
        image: "https://images.pexels.com/photos/33448610/pexels-photo-33448610.jpeg"
    },
    {
        id: 9, 
        name: "Rubber Plant (ยางอินเดีย)", 
        price: 350.00, 
        discount: 15,
        rating: 4.7, 
        reviews: 143, 
        inStock: true, 
        category: "Air Purifying",
        description: "The Rubber Plant is a popular indoor plant known for its large, glossy leaves that can range in color from deep green to variegated patterns. It thrives in bright, indirect light and requires regular watering to keep the soil moist. Rubber Plants are excellent air purifiers, making them a great addition to any indoor space while adding a touch of greenery and elegance.",
        image: "https://images.pexels.com/photos/9819649/pexels-photo-9819649.jpeg"
    },
    {
        id: 10, 
        name: "Aloe Vera", 
        price: 150.00, 
        discount: 10,
        rating: 4.6, 
        reviews: 95, 
        inStock: true, 
        category: "Easy Care",
        description: "Aloe Vera is a succulent plant known for its medicinal properties and easy care requirements. It features thick, fleshy leaves that contain a soothing gel often used for skin care. Aloe Vera thrives in bright, indirect light and requires minimal watering, making it an ideal choice for those new to plant care or looking for a low-maintenance option.",
        image: "https://images.pexels.com/photos/31199029/pexels-photo-31199029.jpeg"
    }
];

export default products;