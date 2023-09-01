import { Link } from "react-router-dom";

const WarrantyPage = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-8 md:gap-4 mt-5">
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
            <li className="text-[#60A5FA]">
              <Link to={"/tos/warranty"}>BẢO HÀNH</Link>
            </li>
            <li>
              <Link to={"/tos/rule"}>CHÍNH SÁCH</Link>
            </li>
          </ol>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-4xl my-5">Chính sách bảo hành</h2>
          <div>
            <h4 className="font-bold my-2">
              Sản phẩm được hỗ trợ khắc phục lỗi miễn phí nếu sản phẩm đó hội đủ
              các điều kiện sau:
            </h4>
            <ol className="ml-4" style={{ listStyleType: "circle" }}>
              <li>
                Sản phẩm bị lỗi kỹ thuật do nhà sản xuất như chất lượng keo,
                chỉ.
              </li>
              <li>
                Sản phẩm sale dưới 40% trừ thương hiệu Native, Holster và sản
                phẩm từ chất liệu nhựa.
              </li>
              <li>Trong vòng 01 tháng kể từ ngày mua hàng.</li>
              <li>
                Khách Hàng còn giữ hóa đơn mua hàng tại shooz.vn hoặc chuỗi cửa
                hàng SHOOZ.
              </li>
              <li>
                Hóa đơn phải còn nguyên vẹn, không chấp vá, bôi xóa, sửa chữa.
                Hóa đơn có đầy đủ thông tin: mẫu mã, số seri, ngày sản xuất, tên
                khách hàng sử dụng, địa chỉ, ngày mua.
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold my-2">
              Những trường hợp không được hỗ trợ khắc phục lỗi hoặc phát sinh
              phí khi tiếp nhận khắc phục:
            </h4>
            <ol className="ml-5" style={{ listStyleType: "circle" }}>
              <li>
                Vi phạm một trong những điều kiện bảo hành miễn phí ở mục 1.
              </li>
              <li>Khách hàng tự ý can thiệp sửa chữa sản phẩm</li>
              <li>
                Sản phẩm bị hư hỏng do lỗi người sử dụng như bề mặt sản phẩm bị
                trầy xước, bị nứt, thấm nước nghiêm trọng, quai bị đứt, phụ kiện
                bị hỏng hoặc rơi mất…
              </li>
              <li>
                Những mặt hàng công ty đã duyệt bán sale hoặc duyệt giảm giá đặc
                biệt
              </li>
              <li>
                BP CSKH sẽ liên hệ với KH để trao đổi thêm thông tin về sản phẩm
                lỗi. Sau thời gian phân tích, sẽ liên lạc KH để thông báo hướng
                thực hiện.
              </li>
              <li>
                Các sản phẩm có mức giảm giá đặc biệt từ 40% trở lên, và các sản
                phẩm Phụ Kiện: bóp, ví, bình nước sẽ không được hoàn đối, bảo
                hành.
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold my-2">Thời hạn bảo hành:</h4>
            <ol className="ml-5" style={{ listStyleType: "circle" }}>
              <li>
                Thời hạn nhận tiếp nhận sửa chữa lỗi được áp dụng trong vòng 30
                ngày kể từ ngày mua hàng.
              </li>
              <li>
                Sản phẩm SHOOZ đảm bảo hàng chính hãng nên công ty khuyến khích
                quý khách gửi sản phẩm trực tiếp đến các cửa hàng thuộc hệ thống
                SHOOZ để được hỗ trợ khắc phục lỗi sản phẩm trong thời gian
                nhanh nhất.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarrantyPage;
