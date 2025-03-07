import { useTranslations } from "next-intl";

export default function Profile({ profile, subscription }) {
  const t = useTranslations("ChatAI.Subscription"); // Lấy hàm dịch từ namespace "ChatAI.Subscription"

  const stats = [
    { label: t("credit_available"), value: subscription?.numberOfCredits || 0, icon: "images/coin.jpg" },
    { label: t("used"), value: subscription?.numberOfCredits - subscription?.remainingCredits || 0, icon: "images/used.jpg" },
    { label: t("remaining"), value: subscription?.remainingCredits || 0, icon: "images/rafiki.jpg" },
  ];

  const avatar = profile?.avatar || "/images/avatar.png";

  return (
    <div className="mt-4">
      <div className="grid grid-cols-10 gap-4 items-center">
        {/* Khối 1: Thông tin người dùng */}
        <div className="col-span-10 md:col-span-4 bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
          <img src={avatar} alt="User Avatar" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-lg text-[#52c6d9]">
              {profile?.firstName + " " + profile?.lastName}
            </h3>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <button className="mt-2 px-4 py-2 text-sm bg-[#52c6d9] text-white rounded-lg hover:bg-[#3ba8bd] transition">
              {t("explore_more")}
            </button>
          </div>
        </div>

        {/* Khối 2, 3, 4: Thống kê */}
        {stats.map((stat, index) => (
          <div key={index} className="col-span-10 md:col-span-2 bg-white p-4 rounded-lg shadow-md text-center">
            <img src={stat.icon} alt="Icon" className="w-12 h-12 mx-auto mb-2" />
            <h4 className="text-sm text-gray-600">{stat.label}</h4>
            <p className="text-2xl font-bold text-[#52c6d9]">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
