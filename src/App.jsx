import { useState, useEffect } from 'react'

export default function App() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('')


  async function fetchProducts(query) {
    if (!query.trim()) {
      setProducts([])
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/products?search=${query}`);
      const data = await response.json();
      setProducts(data)
    } catch (error) {
      (console.error(error))
    }
  }

  useEffect(() => {
    fetchProducts(query)
  }, [query])

  console.log(products)

  return (
    <>
      <div className="row col-2 m-2 ">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Cerca prodotti"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />{
          products.length > 0 && (
            products.map((p) => {
              return (
                <div key={p.id} className='card'>
                  <ul className="list-group list-group-flush">
                    <li className='list-group-item '>{p.connectivity}</li>
                  </ul>
                </div>
              )
            }))
        }
      </div>
    </>
  )
}


