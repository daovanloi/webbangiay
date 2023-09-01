import { Link } from "react-router-dom";
import { IProduct } from "../../types/product";
import { formatMoney } from "../../utils/MoneyUtils";
type Props = {
  ProductSale: IProduct[];
};
const ListProductSale = (props: Props) => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="title">
          <h1 className="my-8 px-2 text-[36px] font-bold">Sản phẩm giảm giá</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.ProductSale.map((product) => (
            // <Link key={product._id} to={`/products/${product._id}`}>
            //     <div className="bg-white p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            //         <h3 className="text-lg font-medium">{product.name}</h3>
            //         <img className='w-full' src={product.images[0]} alt="" />
            //         <p className="mt-1 text-[red] font-bold">${product.salePrice}</p>
            //     </div>
            // </Link>
            <aside className="p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 relative">
              {product.salePrice > 0 && (
                <div className="absolute top-0 right-0 z-10 m-1 flex items-center justify-center w-16 h-16 p-5 text-center text-gray-100 bg-red-600 rounded-full shadow-xl ">
                  <span className="relative text-base font-semibold text-gray-200 ">
                    {(
                      ((product.price - product.salePrice) / product.price) *
                      100
                    ).toFixed(0)}
                    % sale
                  </span>
                </div>
              )}
              <Link to={`/products/${product._id}`}>
                <div className="mb-3">
                  <img src={product?.images[0]} className="w-full" alt="" />
                </div>
                <div>
                  <h3
                    className="font-medium text-[15px] hover:text-yellow-500 mb-1"
                    style={{ transition: "all .35s" }}
                  >
                    {product.name}
                  </h3>
                  <h4 className="font-medium text-[15px] mb-1 text-red-500">
                    {product.salePrice > 0
                      ? formatMoney(Number(product.salePrice))
                      : formatMoney(Number(product.price))}{" "}
                    <span className="text-gray-600 font-light line-through">
                      {product.salePrice > 0
                        ? formatMoney(Number(product.price))
                        : ""}
                    </span>
                  </h4>
                </div>
              </Link>
            </aside>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListProductSale;
