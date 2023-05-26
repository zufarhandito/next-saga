import React, { useEffect, useState } from "react";
import Content from "../content";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import ConfirmDelete from "../ConfirmDelete";
import {
  doDeleteProduct,
  doRequestGetProduct,
} from "../redux/action/ActionReducer";
import { toast } from "react-toastify";

const Product = () => {
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);
  const [whatToDelete, setWhatToDelete] = useState();
  
  const dispatch = useDispatch();
  
  let { products, message, refresh } = useSelector(
    (state: any) => state.productReducers
    );
    const productList: any[] = Array.isArray(products) ? products : [];

  const goToEdit = (item:any) => {
    localStorage.setItem('productById',JSON.stringify(item))
    router.push('products/edit-products')
  }

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    dispatch(doRequestGetProduct());
  }, [refresh]);

  const getWhatToDelete = (data: any) => {
    setWhatToDelete(data);
    setIsDelete(true);
  };

  const deleteDataa = () => {
    // dispatch(delete_product(whatToDelete.id));
    dispatch(doDeleteProduct(whatToDelete.id));
    setIsDelete(false);
  };

  return (
    <Content title="products">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(productList || []).map((item: any) => (
          <div className="bg-white shadow-lg hover:shadow-none transition-shadow rounded-lg p-4">
            <div
              className="lg:min-h-48 h-64 bg-cover bg-center rounded-lg "
              style={{
                backgroundImage: `url(http://localhost:8000/uploads/${item.image})`,
              }}
            ></div>
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-sm mb-2">{item.product_category.name}</p>
            <div className="h-20">
              <p className="overflow-hidden">{item.description}</p>
            </div>
            <div className="flex gap-4 justify-between">
              <button
                className="text-blue-500"
                onClick={()=>goToEdit(item)}
              >
                edit
              </button>

              <button
                onClick={() => {
                  getWhatToDelete(item);
                }}
                className="text-red-600"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isDelete ? (
        <ConfirmDelete
          show={isDelete}
          name={whatToDelete.name}
          closeModal={() => setIsDelete(false)}
          id={whatToDelete.id}
          funcion={getWhatToDelete}
          table="Product"
          remove={deleteDataa}
        />
      ) : (
        ""
      )}
    </Content>
  );
};

export default Product;
