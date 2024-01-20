import React, { useState } from 'react'
import TiendaLogo from '../assets/tienda-logo.png'

function Header({ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }) {

    const [active, setActive] = useState(false)

    const clearCart = () => {
        setTotal(0)
        setCountProducts(0)
        setAllProducts([])
    }

    const removeOneFromCart = (product) => {
        const encontrado = allProducts.find(item => item.id == product.id)
        if (encontrado.quantity > 1) {
            setAllProducts(allProducts.map(item => item.id == product.id ? { ...item, quantity: item.quantity - 1 } : item))
            setTotal(total - product.price)
            setCountProducts(countProducts - 1)
        } else {
            setAllProducts(allProducts.filter(item => item.id !== product.id))
            setTotal(total - product.price * product.quantity)
            setCountProducts(countProducts - product.quantity)
        }
    }

    const removeFromCart = (producto) => {
        setTotal(total - producto.price * producto.quantity)
        setAllProducts(allProducts.filter(item => item.id != producto.id))
        setCountProducts(countProducts - producto.quantity)
    }

    return (
        <header>
            <div className='container-logo-tienda'>
                <img src={TiendaLogo} alt="Logo de la tienda virtual" />
                <h1>Tienda Virtual</h1>
            </div>

            <div className="container-icon">
                <div className="container-cart-icon cart-icon " onClick={() => setActive(!active)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="icon-cart"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    <div className="count-products">
                        <span id="contador-productos">{countProducts}</span>
                    </div>
                </div>

                <div className={`container-cart-products ${!active ? `hidden-cart` : null}`}>
                    {
                        allProducts.length ? (
                            <>
                                <div className="row-product">
                                    {allProducts.map(item => (
                                        <div key={item.id} className="cart-product">
                                            <div className="info-cart-product">
                                                <p className="titulo-producto-carrito">{item.nameProduct}</p>
                                                <span className="precio-producto-carrito">{item.quantity} <span className='simbolo-x'>x</span> $ {item.price}</span>
                                            </div>
                                            <div className='cart-product-options'>
                                                <span className='icon-decrement' onClick={() => removeOneFromCart(item)}>➖</span>
                                                <span className='icon-bin' onClick={() => removeFromCart(item)}>🗑</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-total">
                                    <h3>Total:</h3>
                                    <span className="total-pagar">$ {total}</span>
                                </div>

                                <button className='btn-clear-all' onClick={clearCart}>Vaciar Carrito</button>
                            </>
                        )
                            :
                            (
                                <p className="cart-empty">El carrito está vacío</p>
                            )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header