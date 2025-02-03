import { useState, useEffect } from "react";
import axios from "axios";

import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};

function ProductPage({}) {
  const [products, setProducts] = useState([]);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);

  const getProducts = async (page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(response.data.products);
      setPageInfo(response.data.pagination);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [modalMode, setModalMode] = useState(null);

  const hdlOpenProductModal = (mode, product) => {
    setModalMode(mode);

    if (mode === "edit") {
      setTempProduct(product);
    } else {
      setTempProduct(defaultModalState);
    }

    setIsProductModalOpen(true);
  };

  const [pageInfo, setPageInfo] = useState({});

  const hdlPageChange = (page) => {
    getProducts(page);
  };

  const hdlOpenDelProductModal = (product) => {
    setTempProduct(product);

    setIsDelProductModalOpen(true);
  };

  const [tempProduct, setTempProduct] = useState(defaultModalState);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button
                onClick={() => hdlOpenProductModal("add")}
                type="button"
                className="btn btn-primary"
              >
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() => hdlOpenProductModal("edit", product)}
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => hdlOpenDelProductModal(product)}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination pageInfo={pageInfo} hdlPageChange={hdlPageChange} />
        </div>
      </div>

      <ProductModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        modalMode={modalMode}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
      />

      <DelProductModal
        tempProduct={tempProduct}
        getProducts={getProducts}
        isOpen={isDelProductModalOpen}
        setIsOpen={setIsDelProductModalOpen}
      />
    </>
  );
}

export default ProductPage;
