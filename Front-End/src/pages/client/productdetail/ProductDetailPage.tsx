import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProductDetail } from "../../../types/product";
import { GetOneProduct } from "../../../services/product";
import ListProductDetail from "../../../components/client/ListProductDetail";
import ListRelatedProduct from "../../../components/client/ListRelatedProduct";
import CreateComment from "../../../components/client/CreateComment";

const ProductDetailPage = () => {
  const { id }: string | any = useParams();
  const [product, setproduct] = useState<IProductDetail>();
  useEffect(() => {
    GetOneProduct(id).then((data: any) => setproduct(data));
  }, []);
  if (!product) return null;
  return (
    <section>
      <ListProductDetail product={product} />
      <CreateComment/>
      <ListRelatedProduct product={product} />
    </section>
  );
};
export default ProductDetailPage;
