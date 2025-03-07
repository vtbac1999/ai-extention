"use client";
import { Input, Button, Form, Layout, Menu, Avatar, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ShoppingCartOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Banner from "../banner/Banner";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";

const { Content, Sider } = Layout;

export default function FormUpgrade({ profile, pricing_plan }) {
  const locale = Cookies.get("NEXT_LOCALE") || 'vi';
  const t = useTranslations("ChatAI.Upgrade");
  const u = useTranslations("ChatAI.UserProfile");
  const router = useRouter();
  const handleUpgrade = (plan) => {
  router.push("/payment?type=upgrade&pricingPlanId=" + plan?._id);
  };
  const getPlanName = (plan, lang = "en") => {
    const nameObj = plan.name.find((n) => n.language === lang);
    return nameObj ? nameObj.text : "Unnamed Plan";
  };
  const formatVNDSimple = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  }
  
  

  return (
    <Layout className="grid grid-cols-10 h-screen !bg-[#e6f5f6] p-6 gap-6" >
      {/* Sidebar (Chiếm 3 phần) */}
      <Sider
        className="col-span-3 bg-white p-5 rounded-lg shadow-md border border-gray-300 h-full"
        theme="light"
      >
        <div className="text-center mb-6">
          <Avatar size={80} icon={<UserOutlined />} />
          <div className="mt-3 font-medium text-lg">
            {profile?.firstName + " " + profile?.lastName}
          </div>
          <div className="text-gray-500 text-sm">{profile?.email}</div>
        </div>

        {/* Menu Sidebar */}
        <Menu mode="vertical" defaultSelectedKeys={["/upgrade"]} onClick={({ key }) => router.push(key)}>
          <Menu.Item key="/profile" icon={<UserOutlined />}>{u("editProfile")}</Menu.Item>
          <Menu.Item key="/upgrade" icon={<ShoppingCartOutlined />}>{u("upgrade")}</Menu.Item>
          <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>{u("orderHistory")}</Menu.Item>
          <Menu.Item key="/change-password" icon={<LockOutlined />}>{u("changePassword")}</Menu.Item>
        </Menu>
      </Sider>

      {/* Nội dung chính (Chiếm 7 phần) */}
      <Layout className="col-span-7 p-8 rounded-lg shadow-md h-full bg-[#e6f5f6] !bg-transparent">
        <Banner />
      <div className="mt-7 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">{t("upgrade")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pricing_plan?.map((plan) => (
            <Card key={plan._id} className="text-center border border-gray-200 shadow-sm">
              <h4 className="text-lg text-[#52c6d9] font-semibold">{getPlanName(plan, locale)}</h4>
              <p className="text-xl font-bold">{plan.numberOfCredits} Credit</p>
              <p className="text-gray-500 text-sm">{t("title")}</p>
              <ul className="mt-2 text-gray-600 text-sm">
                {/* Tùy chỉnh danh sách tính năng */}
                {[`${plan?.numberOfCredits} ${t("description")}`].map((feature, i) => (
                  <li key={i}>
                    <img src="/icons/tick.jpg" alt="icon" className="w-5 h-5 inline-block" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                type="primary"
                icon={<CrownOutlined />}
                className="mt-4 w-full !bg-[#52c6d9]"
                onClick={() => handleUpgrade(plan)}
              >
                {t("upgrade")}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
    </Layout>
  );
}
