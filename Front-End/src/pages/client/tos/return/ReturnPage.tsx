import { Link } from "react-router-dom";

const ReturnPage = () => {
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
            <li className="text-[#60A5FA]">
              <Link to={"/tos/return"}>ĐỔI TRẢ</Link>
            </li>
            <li>
              <Link to={"/tos/warranty"}>BẢO HÀNH</Link>
            </li>
            <li>
              <Link to={"/tos/rule"}>CHÍNH SÁCH</Link>
            </li>
          </ol>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-4xl my-5">Chính Sách Đổi Trả</h2>
          <p className="my-3">
            Chính sách đổi trả của Công Ty Cổ Phần Thời Trang Hạ Vàng được áp
            dụng với mong muốn mang đến cho khách hàng những trải nghiệm mua sắm
            tốt nhất tại website Gosumo.vn và Shooz.vn. Các sản phẩm của Hạ Vàng
            khi đến với khách hàng luôn được đảm bảo là hàng chính hãng, hàng
            nguyên mới chưa qua sử dụng, chất lượng và uy tín đến từ các thương
            hiệu nổi tiếng trên thế giới.
          </p>
          <div>
            <h4 className="font-bold my-3">CHÍNH SÁCH TRẢ HÀNG</h4>
            <ol className="ml-5" style={{ listStyleType: "circle" }}>
              <li>
                Chỉ áp dụng trả sản phẩm khi sản phẩm bị lỗi chất lượng từ Hạ
                Vàng.
              </li>
              <li>Ngoài ra, không áp dụng trả hàng với bất kỳ lý do nào.</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold my-3">CHÍNH SÁCH ĐỔI HÀNG</h4>
            <ol className="ml-5" style={{ listStyleType: "circle" }}>
              <li>
                Không áp dụng cho các mặt hàng Đồ lót, Đồ bơi, Đồ thể thao, Phụ
                Kiện (đồng hồ, mắt kính, nón, khẩu trang, vớ, trang sức, cài áo,
                băng đô/kẹp tóc, khăn, nắp túi, chăm sóc/vệ sinh giày…).
              </li>
              <li>
                Chấp nhận đổi size, không đổi kiểu. Chỉ đổi kiểu trong trường
                hợp sản phẩm đó không còn size trên toàn hệ thống.
              </li>
              <li>Áp dụng cho hàng nguyên giá và giảm giá dưới 40%.</li>
              <li>
                Trường hợp đổi sản phẩm khác có chênh lệch giá, khách hàng sẽ
                thanh toán thêm phần chênh lệch thiếu và Hạ Vàng sẽ không hoàn
                trả phần chênh lệch dư.
              </li>
              <li>
                Trong trường hợp khách hàng không chọn được sản phẩm thay thế
                khác, Hạ Vàng sẽ gửi cho khách hàng một Coupon tương đương với
                số tiền đơn hàng khách hàng đã mua trước đó (không bao gồm phí
                vận chuyển). Thời hạn sử dụng coupon là 30 ngày kể từ ngày phát
                hành.
              </li>
              <li>
                Giá của sản phẩm đã mua là giá trên hóa đơn, giá của sản phẩm
                đổi là giá niêm yết tại thời điểm đổi hàng.
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold my-3">THỜI GIAN ĐỔI TRẢ HÀNG</h4>
            <ol className="ml-5" style={{ listStyleType: "circle" }}>
              <li>
                Trong vòng 7 ngày tính từ ngày khách nhận được hàng, đến ngày Hạ
                Vàng nhận được sản phẩm từ khách hàng (không tính trên dấu bưu
                điện hoặc thời gian đăng ký hoàn trả).
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnPage;
