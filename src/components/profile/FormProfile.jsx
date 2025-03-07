"use client";
import { Input, Button, Form, Layout, Menu, Avatar, Upload, message } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  LockOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "@/api/profile";
import { useUploadImage } from "@/api/upload";
import { useTranslations } from "next-intl";

const { Content, Sider } = Layout;

export default function FormProfile({ profile }) {
  const t = useTranslations("ChatAI.UserProfile");
  const [form] = Form.useForm();
  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: uploadImage } = useUploadImage();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (profile) {
      setAvatar(profile?.avatar);
      form.setFieldsValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        avatar: profile.avatar,
      });
    }
  }, [profile]);

  const router = useRouter();

  const onFinish = (values) => {
    values.avatar = avatar;
    updateProfile(values, {
      onSuccess: () => {
        message.success(t("updateSuccess"));
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  const uploadAvatar = ({ file }) => {
    uploadImage(file, {
      onSuccess: (response) => {
        message.success(t("uploadSuccess"));
        setAvatar(response?.result?.path);
        form.setFieldsValue({ avatar: response?.result?.path });
      },
      onError: (error) => {
        message.error(error.message || t("uploadError"));
      },
    });
  };

  const handleRemoveAvatar = () => {
    setAvatar("");
    form.setFieldsValue({ avatar: "" });
  };

  return (
    <Layout className="grid grid-cols-10 h-screen !bg-[#e6f5f6] p-6 gap-6">
      <Sider className="col-span-2 bg-white p-5 rounded-lg shadow-md border border-gray-300" theme="light">
        <div className="text-center mb-6">
          <Avatar size={80} src={avatar || "/images/avatar-non.png"} />
          <div className="mt-2 font-medium text-lg">
            {profile?.firstName + " " + profile?.lastName}
          </div>
          <div className="text-gray-500 text-sm">{profile?.email}</div>
        </div>
        <Menu mode="vertical" defaultSelectedKeys={["/profile"]} onClick={({ key }) => router.push(key)}>
          <Menu.Item key="/profile" icon={<UserOutlined />}>{t("editProfile")}</Menu.Item>
          <Menu.Item key="/upgrade" icon={<ShoppingCartOutlined />}>{t("upgrade")}</Menu.Item>
          <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>{t("orderHistory")}</Menu.Item>
          <Menu.Item key="/change-password" icon={<LockOutlined />}>{t("changePassword")}</Menu.Item>
        </Menu>
      </Sider>

      <Layout className="col-span-7 bg-white p-8 rounded-lg shadow-md border h-full">
        <Content>
          <h2 className="text-2xl font-semibold mb-6 text-center">{t("editPersonalProfile")}</h2>
          <div className="flex items-center gap-4 mb-6">
            <Avatar size={80} src={avatar || "/images/avatar-non.jpg"} />
            <div className="flex flex-col gap-2">
              <Upload showUploadList={false} customRequest={uploadAvatar}>
                <Button icon={<UploadOutlined />}>{t("uploadImage")}</Button>
              </Upload>
              {avatar && <Button danger onClick={handleRemoveAvatar}>{t("removeImage")}</Button>}
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="flex flex-row gap-4">
              <Form.Item name="firstName" label={t("firstName")} rules={[{ required: true, message: t("firstNameRequired") }]} className="w-1/2">
                <Input placeholder={t("firstNamePlaceholder")} />
              </Form.Item>
              <Form.Item name="lastName" label={t("lastName")} rules={[{ required: true, message: t("lastNameRequired") }]} className="w-1/2">
                <Input placeholder={t("lastNamePlaceholder")} />
              </Form.Item>
            </div>

            <Form.Item name="email" label={t("email")} rules={[{ required: true, message: t("emailRequired") }]}>
              <Input placeholder={t("emailPlaceholder")} />
            </Form.Item>

            <Form.Item name="phone" label={t("phoneNumber")} rules={[{ required: true, message: t("phoneRequired") }]}>
              <Input placeholder={t("phonePlaceholder")} />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end gap-3">
                <Button className="border border-blue-500 text-blue-500">{t("cancel")}</Button>
                <Button type="primary" htmlType="submit" className="!bg-[#52c6d9]">
                  {t("save")}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
}
