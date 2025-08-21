
import React, { useEffect, useMemo, useState } from 'react'
import './app.css'

function useCart() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  useEffect(() => localStorage.setItem('cart', JSON.stringify(items)), [items])
  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items])
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items])
  const add = (p) => {
    setItems(prev => {
      const found = prev.find(it => it.id === p.id)
      if (found) return prev.map(it => it.id === p.id ? {...it, qty: it.qty + 1} : it)
      return [...prev, {...p, qty: 1}]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(it => it.id !== id))
  const inc = (id) => setItems(prev => prev.map(it => it.id === id ? {...it, qty: it.qty + 1} : it))
  const dec = (id) => setItems(prev => prev.map(it => it.id === id ? {...it, qty: Math.max(1, it.qty - 1)} : it))
  const clear = () => setItems([])
  return { items, add, remove, inc, dec, clear, total, count }
}

export default function App() {
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const cart = useCart()

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return products
    return products.filter(p =>
      p.name.toLowerCase().includes(t) ||
      p.category.toLowerCase().includes(t) ||
      p.brand?.toLowerCase().includes(t)
    )
  }, [q, products])

  return (
    <>
      <header className="header">
        <h1>Amazon Clone</h1>
        <div className="search">
          <input placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} />
          <button onClick={() => setQ('')}>Clear</button>
        </div>
        <div><span className="badge">Cart: {cart.count}</span></div>
      </header>

      <main className="container">
        <div className="grid">
          {filtered.map(p => (
            <div className="card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p className="small">{p.brand} • {p.category}</p>
              <p className="price">${p.price}</p>
              <button className="btn" onClick={() => cart.add(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>

      <aside className="cart-drawer">
        <div className="cart-header">
          <strong>Your Cart</strong>
          <button onClick={cart.clear}>Clear</button>
        </div>
        <div>
          {cart.items.length === 0 && <p className="small">Cart is empty</p>}
          {cart.items.map(it => (
            <div className="cart-item" key={it.id}>
              <img src={it.image} alt={it.name} />
              <div className="cart-item-info">
                <div>{it.name}</div>
                <div className="small">${it.price} × {it.qty}</div>
                <div>
                  <button onClick={() => cart.dec(it.id)}>-</button>
                  <button onClick={() => cart.inc(it.id)} style={{marginLeft: 8}}>+</button>
                  <button onClick={() => cart.remove(it.id)} style={{marginLeft: 8}}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div><strong>Total: ${cart.total.toFixed(2)}</strong></div>
        <button className="checkout" onClick={() => alert('Checkout placeholder – integrate Stripe/Razorpay next!')}>
          Proceed to Checkout
        </button>
      </aside>
    </>
  )
}
