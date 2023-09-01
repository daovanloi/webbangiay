import { Link } from "react-router-dom";
type Props = {
  data: undefined | any;
};

const ClientEmptyCart = ({ data }: Props) => {
  if (data == undefined || data.length === 0) {
    return (
      <div className="">
        <h3 className="text-center my-4 text-gray-500">
          Có 0 sản phẩm trong giỏ hàng
        </h3>
        <div className="w-full flex justify-center items-center">
          <div className="w-[70px] bg-gray-700 h-1"></div>
        </div>
        <h3 className="text-center my-4 text-gray-500">
          Giỏ hàng của bạn đang trống
        </h3>
        <div className="text-center">
          <Link to={"/products"}>
            <button
              type="button"
              className="text-gray-700 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm md:px-8 md:my-3 md:py-3 md:text-2xl px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
            >
              <i className="fa-solid fa-rotate-left mr-2"></i>
              Tiếp tục mua hàng
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ClientEmptyCart;
