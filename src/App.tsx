import { useState } from 'react';
import './App.css';

type Product = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 39.99,
    emoji: '🎧',
    description: 'Enjoy your favourite music anywhere.',
  },
  {
    id: 2,
    name: 'Water Bottle',
    price: 14.99,
    emoji: '💧',
    description: 'Stay hydrated throughout the day.',
  },
  {
    id: 3,
    name: 'Smartwatch',
    price: 59.99,
    emoji: '⌚',
    description: 'Track your activities and stay connected.',
  },
  {
    id: 4,
    name: 'Tote Bag',
    price: 12.99,
    emoji: '🛍️',
    description: 'A reusable bag for everyday shopping.',
  },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Add a product to the shopping cart
  const addToCart = (product: Product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.id === product.id);

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Remove a product completely
  const removeFromCart = (productId: number) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  };

  // Change the quantity of a product
  const changeQuantity = (productId: number, amount: number) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate cart totals
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // We will replace this function when integrating Stripe
  const handleCheckout = () => {
    alert(
      'Stripe is not integrated yet! Follow the demonstration to enable payments.'
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <h1>🛒 MiniShop</h1>

        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          🛍️ Cart ({itemCount})
        </button>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Welcome to MiniShop!</h2>
          <p>Discover great products at affordable prices.</p>
        </section>

        <h2 className="section-title">Our Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">{product.emoji}</div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="product-bottom">
                  <span className="price">€{product.price.toFixed(2)}</span>

                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCart && (
          <section className="cart-section">
            <div className="cart-heading">
              <h2>Your Shopping Cart</h2>

              <button
                className="close-button"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h3>
                        {item.emoji} {item.name}
                      </h3>
                      <p>€{item.price.toFixed(2)} each</p>
                    </div>

                    <div className="quantity-controls">
                      <button onClick={() => changeQuantity(item.id, -1)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => changeQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>

                    <strong>€{(item.price * item.quantity).toFixed(2)}</strong>

                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="cart-footer">
                  <h2>Total: €{total.toFixed(2)}</h2>

                  <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>MiniShop © 2026 | Stripe Integration Demo</p>
      </footer>
    </div>
  );
}

export default App;
