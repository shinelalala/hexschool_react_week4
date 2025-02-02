import { useState } from 'react';
import Login from './pages/login';
import ProductPage from './pages/productPage';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? <ProductPage setIsAuth={setIsAuth} /> :
        <Login setIsAuth={setIsAuth} />
      }
    </>
  )
}

export default App
