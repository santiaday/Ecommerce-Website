import React, { useState , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GlobalStyle from './globalStyles';

import { Products, Navbar, Cart, Checkout, Homepage, ProductDescription, SearchResults, LoginForm } from './Components';
import { commerce } from './lib/commerce';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, isLoading] = useState(true);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);


    Promise.all(
      data.map(async(p) => {
      const productId = p.id;
      const product = {productId};
      console.log(product)
      return(
      fetch("http://localhost:8080/product/updateTable", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(product), 
      }
    ))
  }))}

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const {cart} = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  } 

  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    }catch (error){
      setErrorMessage(error.data.error.message);
    }
  }
  

  useEffect(() => {

    fetchProducts()
    fetchCart();
    isLoading(false);
  
  }, []);


  return (
    <Router>
  <div>
        <GlobalStyle />
        <Navbar totalItems={cart.total_items} products={products}/>
        <Routes>
          <Route exact path = "/" element={<Homepage products={products} onAddToCart={handleAddToCart}/>} />
          <Route exact path = "/products" element={<Products products={products} onAddToCart={handleAddToCart}/>} />
          <Route exact path = "/cart" element={<Cart 
          cart={cart}
          handleUpdateCartQty={handleUpdateCartQty} 
          handleRemoveFromCart={handleRemoveFromCart} 
          handleEmptyCart={handleEmptyCart}
          />} />
          <Route path = "/product/:productId" element={<ProductDescription onAddToCart={handleAddToCart} />} />
          <Route exact path = "/search=:keyword" element={<SearchResults products={products} onAddToCart={handleAddToCart}/>} />
          <Route exact path = "/checkout" element={<Checkout cart={cart} order = {order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>} />
          <Route exact path = "/login-form" element={<LoginForm />} />
        </Routes>
  </div>
  </Router>
  )
}

export default App;
