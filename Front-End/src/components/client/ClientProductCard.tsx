import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/MoneyUtils";
type Props = {
  _id: string | undefined;
  imageUrl: string;
  name: string;
  price: number;
  salePrice: number;
};

const ClientProductCard = (props: Props) => {
  if (!props || props == undefined) return <div>Loading ...</div>;
  return (
    <aside className="p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 relative">
      {props.salePrice > 0 && (
        <div className="absolute top-0 right-0 z-10 m-1 flex items-center justify-center w-16 h-16 p-5 text-center text-gray-100 bg-red-600 rounded-full shadow-xl ">
          <span className="relative text-base font-semibold text-gray-200 ">
            {(((props.price - props.salePrice) / props.price) * 100).toFixed(0)}
            % sale
          </span>
        </div>
      )}
      <Link to={`/products/${props._id}`}>
        <div className="mb-3">
          <img src={props.imageUrl} className="w-full" alt="" />
        </div>
        <div>
          <h3
            className="font-medium text-[15px] hover:text-yellow-500 mb-1"
            style={{ transition: "all .35s" }}
          >
            {props.name}
          </h3>
          <h4 className="font-medium text-[15px] mb-1 text-red-500">
            {props.salePrice > 0
              ? formatMoney(Number(props.salePrice))
              : formatMoney(Number(props.price))}{" "}
            <span className="text-gray-600 font-light line-through">
              {props.salePrice > 0 ? formatMoney(Number(props.price)) : ""}
            </span>
          </h4>
        </div>
      </Link>
    </aside>
  );
};

export default ClientProductCard;
