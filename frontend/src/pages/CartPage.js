import React from 'react';

const CartPage = ({ cart, setCart }) => {
  // Funzione per rimuovere una quantità alla volta
  const removeFromCart = (book) => {
    const existingBook = cart.find(item => item._id === book._id);

    if (existingBook.quantity > 1) {
      setCart(cart.map(item =>
        item._id === book._id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item._id !== book._id));
    }
  };

  const increaseQuantity = (book) => {
    setCart(cart.map(item =>
      item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Il tuo Carrello</h1>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Autore</th>
                <th>Prezzo</th>
                <th>Quantità</th>
                <th>Totale</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(book => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price} €</td>
                  <td>{book.quantity}</td>
                  <td>{(book.price * book.quantity).toFixed(2)} €</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => increaseQuantity(book)}>+</button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => removeFromCart(book)}>-</button>
                    <button className="btn btn-danger btn-sm" onClick={() => setCart(cart.filter(item => item._id !== book._id))}>
                      Rimuovi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-secondary mt-3" onClick={clearCart}>Svuota Carrello</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
