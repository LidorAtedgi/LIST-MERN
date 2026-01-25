import React, { useState, useRef, useEffect } from 'react'
import "./ItemCard.css"

function ItemCard({name, acquired, quantity = 1, onToggle, onDelete, onUpdate, onQuantityChange, loading}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete();
  };

  const handleUpdate = () => {
    setMenuOpen(false);
    onUpdate();
  };

  const increaseQty = () => {
    if (onQuantityChange) onQuantityChange(quantity + 1);
  };

  const decreaseQty = () => {
    if (onQuantityChange && quantity > 1) onQuantityChange(quantity - 1);
  };

  return (
    <div className='contain'>
      <div className='item-name'>{name}</div>

      {loading ? (
        <div className='spinner'></div>
      ) : (
        <>
          <input 
            type='checkbox' 
            checked={acquired} 
            onChange={onToggle}
            className='item-checkbox'
          />
          <div className='quantity-controls'>
            <button onClick={decreaseQty} className='qty-button' aria-label="Decrease quantity">−</button>
            <span className='qty-display'>{quantity}</span>
            <button onClick={increaseQty} className='qty-button' aria-label="Increase quantity">+</button>
          </div>
        </>
      )}

      <div className='menu-container' ref={menuRef}>
        <button 
          className='menu-button' 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {menuOpen && (
          <div className='dropdown-menu'>
            <button onClick={handleUpdate} className='menu-item update'>
              <span className='menu-icon'>✏️</span>
              <span>update</span>
            </button>
            <button onClick={handleDelete} className='menu-item delete'>
              <span className='menu-icon'>🗑️</span>
              <span>delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemCard