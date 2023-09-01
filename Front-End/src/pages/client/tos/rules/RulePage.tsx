
import { Link } from "react-router-dom";

const RulePage = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-8 md:gap-4">
        <div className="border p-2">
          <h2 className="text-2xl font-bold">DANH MỤC TRANG</h2>
          <hr className="font-bold my-3" />
          <ol className="ml-3" style={{ listStyleType: "number" }}>
            <li>
              <Link to={"/tos"}>ĐIỀU KHOẢN</Link>
            </li>
            <li>
              <Link to={"/tos/return"}>ĐỔI TRẢ</Link>
            </li>
            <li>
              <Link to={"/tos/warranty"}>BẢO HÀNH</Link>
            </li>
            <li className="text-[#60A5FA]">
              <Link to={"/tos/rule"}>CHÍNH SÁCH</Link>
            </li>
          </ol>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-4xl my-5">
            Quy Định & Hình Thức Thanh Toán
          </h2>
          <p>
            Đây là cửa hàng Shooz trực tuyến chính thức tại Việt Nam. Mong muốn
            của chúng tôi là mang đến cho khách hàng những trải nghiệm mua sắm
            tuyệt với nhất. Vì vậy, chúng tôi cung cấp cho quý khách bốn hình
            thức thanh toán tiện lợi như sau:
          </p>
          <ol className="ml-5" style={{ listStyleType: "circle" }}>
            <li>Thanh toán khi giao hàng (Cash On Delivery).</li>
            <li>Chuyển khoản qua ngân hàng.</li>
            <li>
              Thanh toán online qua cổng VNPay (ATM/Visa/MasterCard/JCB/QR Pay
              trên Mobile Banking).
            </li>
            <li>Thanh toán online qua cổng OnePay bằng thẻ ATM nội địa.</li>
            <li>
              Thanh toán online qua cổng OnePay bằng thẻ
              Visa/Master/JCB/American Express/CUP.
            </li>
          </ol>
          <p className="my-3">
            Để biết thông tin chi tiết, Quý khách vui lòng liên hệ trực tiếp với
            chúng tôi.
          </p>
          <p className="my-3">
            Đối với trường hợp khách hàng muốn hủy đơn ngay sau khi thanh toán
            thành công vui lòng liên hệ bộ phận CSKH qua số hotline 1900 63 6641
            để được hướng dẫn cụ thể.
          </p>
          <p className="my-3">
            Khi mua sắm tại Shooz.vn, giao dịch của bạn luôn luôn được bảo mật.
            Hiện tại, chúng tôi chỉ đáp ứng các đơn hàng giao trong lãnh thổ
            Việt Nam. Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng
            trả lời các các thắc mắc và giúp Quý khách có trải nghiệm mua sắm
            thật đặc biệt.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulePage;
