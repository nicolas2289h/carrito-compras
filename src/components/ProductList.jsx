import React from 'react'
import { data } from '../data'

function ProductList({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) {

    const addProduct = (product) => {
        const productoExistente = allProducts.find(item => item.id == product.id)
        productoExistente ?
            (
                setAllProducts(allProducts.map(item => item.id == product.id ? { ...item, quantity: item.quantity + 1 } : item)),
                setTotal(total + product.price * product.quantity),
                setCountProducts(countProducts + product.quantity))
            :
            (
                setTotal(total + product.price * product.quantity),
                setCountProducts(countProducts + product.quantity),
                setAllProducts([...allProducts, product])
            )
    }

    return (
        <div className="container-items">
            {data.map(item => (
                <div key={item.id} className="item">
                    <figure>
                        <img
                            src={item.img}
                            alt="producto"
                        />
                    </figure>
                    <div className="info-product">
                        <h2>{item.nameProduct}</h2>
                        <p className="price">$ {item.price}</p>
                        <button className="btn-add-cart" onClick={() => addProduct(item)}>Añadir al carrito</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList