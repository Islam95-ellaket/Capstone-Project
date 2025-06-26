import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../api/api';

const BookDetailPage = ({ cart, setCart }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const addToCart = () => {
    const existingBook = cart.find(item => item._id === book._id);

    if (existingBook) {
      setCart(cart.map(item =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  if (!book) return <div className="container mt-5">Caricamento...</div>;

  return (
    <div className="container mt-5">
      <h1>{book.title}</h1>
      <h4 className="text-muted">{book.author}</h4>
      <img
        src={book.coverImage}
        alt={book.title}
        className="img-fluid my-3"
        style={{ maxHeight: '500px', objectFit: 'contain' }}
      />
      <p className="lead">{book.description}</p>
      <p className="fw-bold">{book.price} €</p>
      <button className="btn btn-success" onClick={addToCart}>
        Aggiungi al Carrello
      </button>
    </div>
  );
};

export default BookDetailPage;
