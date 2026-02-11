-- Insert Sample Users
-- Password is 'password123' hashed with BCrypt
INSERT INTO users (name, email, password, phone, address) VALUES
('John Doe', 'user@example.com', '$2a$10$XvR3Z8Y0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0', '1234567890', '123 Main St, City, State 12345'),
('Admin User', 'admin@example.com', '$2a$10$XvR3Z8Y0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0', '9876543210', '456 Admin Ave, City, State 67890'),
('Jane Smith', 'jane@example.com', '$2a$10$XvR3Z8Y0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0HfQj0ZQx0', '5555555555', '789 Oak Rd, City, State 11111');

-- Insert Sample Products
INSERT INTO products (name, description, price, image_url, stock_quantity, category) VALUES
-- Electronics
('Laptop Pro 15', 'High-performance laptop with 16GB RAM and 512GB SSD', 899.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 25, 'Electronics'),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 29.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 100, 'Electronics'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI and card reader', 49.99, 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', 50, 'Electronics'),
('Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 79.99, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 40, 'Electronics'),
('Smartphone X', 'Latest smartphone with 128GB storage', 699.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 30, 'Electronics'),

-- Clothing
('Cotton T-Shirt', 'Comfortable cotton t-shirt in various colors', 19.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 200, 'Clothing'),
('Denim Jeans', 'Classic fit denim jeans', 49.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 150, 'Clothing'),
('Sneakers', 'Comfortable running sneakers', 89.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 80, 'Clothing'),
('Hoodie', 'Warm fleece hoodie with front pocket', 39.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', 120, 'Clothing'),
('Baseball Cap', 'Adjustable baseball cap', 24.99, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400', 90, 'Clothing'),

-- Home & Kitchen
('Coffee Maker', 'Programmable coffee maker with 12-cup capacity', 59.99, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', 45, 'Home'),
('Blender', 'High-speed blender for smoothies and shakes', 69.99, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400', 35, 'Home'),
('Non-Stick Pan Set', 'Set of 3 non-stick frying pans', 44.99, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 60, 'Home'),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 34.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', 70, 'Home'),
('Storage Organizer', 'Multi-compartment storage organizer', 27.99, 'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?w=400', 55, 'Home'),

-- Books
('Learn JavaScript', 'Complete guide to modern JavaScript programming', 39.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 100, 'Books'),
('Python for Beginners', 'Step-by-step Python programming book', 34.99, 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400', 85, 'Books'),
('Web Development Basics', 'HTML, CSS, and JavaScript fundamentals', 29.99, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', 95, 'Books'),
('Database Design', 'SQL and database design principles', 44.99, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400', 65, 'Books'),
('Algorithm Mastery', 'Data structures and algorithms explained', 49.99, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 75, 'Books'),

-- Sports
('Yoga Mat', 'Non-slip yoga mat with carrying strap', 24.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 110, 'Sports'),
('Dumbbells Set', 'Adjustable dumbbells 5-25 lbs', 79.99, 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', 40, 'Sports'),
('Water Bottle', 'Insulated stainless steel water bottle', 19.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', 150, 'Sports'),
('Resistance Bands', 'Set of 5 resistance bands with different strengths', 29.99, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', 90, 'Sports'),
('Jump Rope', 'Speed jump rope with counter', 14.99, 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400', 130, 'Sports');
