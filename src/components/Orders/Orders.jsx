"use client";
import { Table, Tag, Layout, Menu, Avatar } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Banner from "../banner/Banner";
import { useTranslations } from "next-intl";
import { addMonths, format } from "date-fns";
import { vi } from "date-fns/locale";
import Cookies from "js-cookie";
import { useState } from "react";
import { useGetHistoryOrder } from "@/api/order";

const { Content, Sider } = Layout;

export default function FormOrder({ profile }) {
  const locale = Cookies.get("NEXT_LOCALE") || "vi";
  const t = useTranslations("ChatAI.UserProfile");
  const o = useTranslations("ChatAI.Order");

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  // Gọi API với phân trang
  const { data: historyOrders } = useGetHistoryOrder(currentPage, pageSize);

  const columns = [
    {
      title: o("plan"),
      dataIndex: "package",
      key: "package",
    },
    {
      title: o("transactionType"),
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: o("paymentMethod"),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: o("total"),
      dataIndex: "totalPayment",
      key: "totalPayment",
    },
    {
      title: o("orderDate"),
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: o("expiry"),
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: o("status"),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Hoạt động" ? "green" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const data = historyOrders?.result?.items?.map((item) => {
    const date = new Date(item.createdAt);
    const formattedDatePurchase = date.toLocaleDateString("vi-VN");
    const newDate = addMonths(date, 1);
    const formattedDateExp = format(newDate, "dd/MM/yyyy", { locale: vi });
    const packageSub =
      locale === "vi" ? item.pricingPlan?.name[1]?.text : item.pricingPlan?.name[0]?.text;
    return {
      key: item.orderId,
      totalPayment: item.price,
      status: item.status,
      purchaseDate: formattedDatePurchase,
      expiryDate: formattedDateExp,
      paymentMethod: locale == "vi" ? "Chuyển khoản" : "Transfer",
      package: packageSub,
      transactionType: item.type,
    };
  });

  const router = useRouter();

  return (
    <Layout className="flex flex-col lg:grid lg:grid-cols-10 h-full w-full bg-[#e6f5f6] p-4 lg:p-6 gap-4 lg:gap-6">
      {/* Sidebar (Ẩn trên điện thoại, chỉ hiển thị trên màn hình lớn) */}
      <Sider
        className="hidden lg:block col-span-2 bg-white p-5 rounded-lg shadow-md border border-gray-300 h-full"
        theme="light"
      >
        <div className="text-center mb-6">
          <Avatar size={80} src={profile?.avatar || "/images/avatar-non.png"} />
          <div className="mt-2 font-medium text-lg">
            {profile?.firstName + " " + profile?.lastName}
          </div>
          <div className="text-gray-500 text-sm">{profile?.email}</div>
        </div>

        {/* Menu */}
        <Menu
          mode="vertical"
          defaultSelectedKeys={["/orders"]}
          onClick={({ key }) => router.push(key)}
        >
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            {t("editProfile")}
          </Menu.Item>
          <Menu.Item key="/upgrade" icon={<ShoppingCartOutlined />}>
            {t("upgrade")}
          </Menu.Item>
          <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
            {t("orderHistory")}
          </Menu.Item>
          <Menu.Item key="/change-password" icon={<LockOutlined />}>
            {t("changePassword")}
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Nội dung chính */}
      <Layout className="flex-1 p-4 lg:p-8 rounded-lg h-full shadow-md border border-gray-300 bg-white">
        <Banner />
        <div className="p-4 lg:p-6">
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{t("orderHistory")}</h2>
            
            {/* Bảng có thể cuộn ngang trên điện thoại */}
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={data}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: historyOrders?.result?.totalItems, // Tổng số đơn hàng
                  onChange: (page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                  },
                  showSizeChanger: true,
                  pageSizeOptions: ["4"],
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}
