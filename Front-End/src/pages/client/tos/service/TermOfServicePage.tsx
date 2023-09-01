import { Link } from "react-router-dom";

const TermOfServicePage = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-8 md:gap-4">
        <div className="border p-2">
          <h2 className="text-2xl font-bold">DANH MỤC TRANG</h2>
          <hr className="font-bold my-3" />
          <ol className="ml-3" style={{ listStyleType: "number" }}>
            <li className="text-[#60A5FA]">
              <Link to={"/tos"}>ĐIỀU KHOẢN</Link>
            </li>
            <li>
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
          <h2 className="font-bold text-4xl my-5">Điều Khoản Dịch Vụ</h2>
          <div>
            <h4 className="my-3 font-bold">CHÍNH SÁCH & QUY ĐỊNH CHUNG</h4>
            <ol className="ml-5" style={{ listStyleType: "circle" }}>
              <li>
                Webiste bán hàng trực tuyến shooz.vn do Công Ty Cổ Phần Thời
                Trang Hạ Vàng (sau đây gọi là “Website shooz.vn”) thực hiện hoạt
                động và vận hành.
              </li>
              <li>
                Nguyên tắc này áp dụng cho các thành viên đăng ký sử dụng các
                dịch vụ do Website SHOOZ cung cấp.
              </li>
              <li>
                Thương nhân, tổ chức, cá nhân tham gia giao dịch tại Website tự
                do thỏa thuận trên cơ sở tôn trọng quyền và lợi ích hợp pháp của
                các bên tham gia hoạt động tuyển dụng thông qua hợp đồng, không
                trái với qui định của pháp luật.
              </li>
              <li>
                Thông tin về thương nhân, tổ chức, cá nhân tham gia là thành
                viên trên Website phải minh bạch và chính xác. Thông tin về
                khuyến mại của nhà cung cấp được đăng tải trên Website phải đáp
                ứng đầy đủ các quy định của pháp luật có liên quan, không thuộc
                các trường hợp cấm theo quy định của pháp luật.
              </li>
              <li>
                Sản phẩm hàng hóa tham gia giao dịch trên Website phải được phép
                kinh doanh, lưu hành và không thuộc các trường hợp cấm kinh
                doanh, cấm quảng cáo theo quy định của pháp luật.
              </li>
              <li>
                Các nội dung trong bản Quy chế này phải tuân thủ theo hệ thống
                pháp luật hiện hành của Việt Nam. Thành viên khi tham gia vào
                Website phải tự tìm hiểu trách nhiệm pháp lý của mình đối với
                luật pháp hiện hành của Việt Nam và cam kết thực hiện đúng những
                nội dung trong Quy chế của Website.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermOfServicePage;
