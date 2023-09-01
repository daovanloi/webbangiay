import ClientProductCard from "../../../components/client/ClientProductCard";
import { useState, useEffect } from "react";
import { GetAllProduct, ProductSort } from "../../../services/product";
import { GetAllCategory } from "../../../services/categories";
import { Link } from "react-router-dom";
import { ICategory } from "../../../types/category";
import { IProduct } from "../../../types/product";
import { GetOneCategory } from "../../../services/categories";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchproducts } from "../../../redux/slices/product.slice";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Redux
  useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchFilm = async () => {
    try {
      const data = await dispatch(fetchproducts()).unwrap();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  //

  useEffect(() => {
    onHandleGetAllProduct();
  }, []);
  // pagination
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  async function onHandleGetAllProduct() {
    try {
      // const { data } = await GetAllProduct();
      const data = await handleFetchFilm();
      setProducts(data);
      const res = await GetAllCategory();
      setCategory(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function onHandleSortProduct(value: string) {
    try {
      const resPro = await ProductSort(String(value));
      setProducts(resPro.data);
      const res = await GetAllCategory();
      setCategory(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function onHandleGetOneCategory(id: string) {
    try {
      const resPro = await GetOneCategory(String(id));
      setCurrentPage(1);
      setProducts(resPro.data.products);
      const res = await GetAllCategory();
      setCategory(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <div>Loading ...</div>;
  return (
    <section>
      <aside className="w-full m-auto max-sm:py-3">
        <img
          src="https://file.hstatic.net/1000376021/file/1920x720_copy__4___1__451089634ed34e8d9332d622db6c9c0d.png"
          alt=""
        />
      </aside>
      <aside className="md:flex max-w-[1170px] w-full m-auto md:py-7">
        <div className="order-1 md:w-3/12">
          <div>
            <h3 className="md:text-2xl text-lg font-bold">Danh mục</h3>
          </div>
          <div className="py-3">
            <Link to={`/products`}>
              <div
                onClick={() => onHandleGetAllProduct()}
                className="font-medium text-[14px] cursor-pointer uppercase"
              >
                Tất cả sản phẩm
              </div>
            </Link>
            {category?.map((category: ICategory, index) => (
              <div
                key={index}
                onClick={() => onHandleGetOneCategory(category._id)}
                className="font-medium text-[14px] uppercase cursor-pointer py-[1px] sm:hover:bg-slate-300"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className="order-2 md:w-3/4">
          <div className="flex justify-between">
            <div>
              <h3 className="md:text-2xl text-lg font-bold">Tất cả sản phẩm</h3>
            </div>
            <div>
              <select
                name=""
                id=""
                className="bottom-1 border-cyan-950"
                defaultValue={"1"}
                onChange={(e) => onHandleSortProduct(String(e.target.value))}
              >
                <option value="new">Sản phẩm mới nhất</option>
                <option value="old">Sản phẩm cũ nhất</option>
                <option value="az">Lọc theo tên A - Z</option>
                <option value="za">Lọc theo tên Z - A</option>
              </select>
            </div>
          </div>
          {products.length > 0 ? (
            <>
              <section className="grid md:grid-cols-3 max-sm:grid-cols-1 gap-7 py-4">
                {currentProducts?.map((product: IProduct, index) => (
                  <ClientProductCard
                    key={index}
                    _id={product._id}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    imageUrl={product.images[0]}
                  />
                ))}
              </section>{" "}
              <Pagination
                className="mt-8"
                current={currentPage}
                pageSize={productsPerPage}
                total={products.length}
                onChange={handleChangePage}
              />
            </>
          ) : (
            <div className="w-full text-center">
              <h3 className="text-xl font-medium py-10">
                Không có sản phẩm nào
              </h3>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};

export default ProductPage;
