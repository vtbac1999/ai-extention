"use client";
import { Input, Button, Form, Layout, Menu, Avatar, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChangePassword } from "@/api/auth";
import { useTranslations } from "next-intl";

const { Content, Sider } = Layout;

export default function FormChangePassword({ profile }) {
  const [form] = Form.useForm();
  const { mutate: updatePassword } = useChangePassword();
  const router = useRouter();
  const t = useTranslations("ChatAI.UserProfile");
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({ email: profile.email });
    }
  }, [profile]);

  const onFinish = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu mới và nhập lại mật khẩu không khớp!");
      return;
    }

    updatePassword({
      email: values.email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    }, {
      onSuccess: () => message.success("Đổi mật khẩu thành công!"),
      onError: (error) => message.error(error.message || "Có lỗi xảy ra"),
    });
  };

  return (
    <Layout className="grid grid-cols-10 h-screen !bg-[#e6f5f6] p-6 gap-6">
        <Sider className="col-span-2 bg-white p-5 rounded-lg shadow-md border border-gray-300" theme="light">
        <div className="text-center mb-6">
          <Avatar size={80} src={profile?.avatar || "/images/avatar-non.png"} />
          <div className="mt-2 font-medium text-lg">
            {profile?.firstName + " " + profile?.lastName}
          </div>
          <div className="text-gray-500 text-sm">{profile?.email}</div>
        </div>
        <Menu mode="vertical" defaultSelectedKeys={["/change-password"]} onClick={({ key }) => router.push(key)}>
          <Menu.Item key="/profile" icon={<UserOutlined />}>{t("editProfile")}</Menu.Item>
          <Menu.Item key="/upgrade" icon={<ShoppingCartOutlined />}>{t("upgrade")}</Menu.Item>
          <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>{t("orderHistory")}</Menu.Item>
          <Menu.Item key="/change-password" icon={<LockOutlined />}>{t("changePassword")}</Menu.Item>
        </Menu>
      </Sider>

      <Layout className="col-span-7 bg-white p-8 rounded-lg shadow-md border h-full ">
        <Content>
          <h2 className="text-2xl font-semibold mb-6 text-center">{t("changePassword")}</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label={t('email')} rules={[{ required: true, message: "Vui lòng nhập email" }]}>
              <Input disabled />
            </Form.Item>

            <Form.Item name="oldPassword" label={t("oldPassword")} rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}>
              <Input.Password placeholder="Nhập mật khẩu cũ" />
            </Form.Item>
            <Form.Item name="newPassword" label={t("newPassword")} rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}>
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item name="confirmPassword" label={t("confirmPassword")} rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu" }]}>
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end gap-3">
                <Button onClick={() => router.back()} className="border border-blue-500 text-blue-500">{t("cancel")}</Button>
                <Button type="primary" htmlType="submit" className="bg-[#52c6d9]">{t("save")}</Button>
              </div>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
