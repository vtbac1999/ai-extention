export default function Footer() {
    return (
      <footer className="bg-[#EAF6F8] py-6 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo + Tên thương hiệu */}
          <div className="flex items-center gap-3 mb-2">
            <img src="/images/logo.png" alt="LIT Education" className="w-10 h-10 rounded-full" />
            <h4 className="font-semibold text-lg text-gray-900">LIT Education</h4>
          </div>
  
          <hr className="border-gray-300 mb-2" />
  
          {/* Thông tin liên hệ */}
          <p className="font-bold text-gray-900">
            [HỌC NGÔN NGỮ QUA SỞ THÍCH LIT – LEARNING LANGUAGES THROUGH INTERESTS AND TECHNOLOGY]
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Hotline:</span> 0968046273 / 0978531265 &nbsp;
            <span className="font-semibold">- Email:</span> lit.education123@gmail.com
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Địa chỉ:</span> Phòng 1227, Tòa CT5, khu đô thị Mễ Trì, Nam Từ Liêm, Hà Nội và 18 cơ sở khác trên toàn quốc
          </p>
        </div>
      </footer>
    );
  }
  