"use client";
import { useGetSurvey, useSaveSurvey } from "@/api/survey";
import { useUserStore } from "@/stores/useUserStore";
import { Button, Form, Input, Modal, Select } from "antd";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

function translateFormFields(t) {
  return {
    fullName: { label: t("fullName"), validate: t("validateFullName") },
    email: { label: t("Email"), validate: t("validateEmail") },
    phoneNumber: {
      label: t("phoneNumber"),
      validate: t("validatePhoneNumber"),
    },
    companyAddress: {
      label: t("companyAddress"),
      validate: t("validateCompanyAddress"),
    },
    companyVision: {
      label: t("companyVision"),
      validate: t("validateCompanyVision"),
    },
    competitiveAdvantage: {
      label: t("competitiveAdvantage"),
      validate: t("validateCompetitiveAdvantage"),
    },
    companyName: {
      label: t("companyName"),
      validate: t("validateCompanyName"),
    },
    productDescription: {
      label: t("productDescription"),
      validate: t("validateProductDescription"),
    },
    nextYearPlan: {
      label: t("nextYearPlan"),
      validate: t("validateNextYearPlan"),
    },
    companySize: {
      label: t("companySize"),
      options: [
        { value: "micro", label: t("micro") },
        { value: "small", label: t("small") },
        { value: "medium", label: t("medium") },
        { value: "large", label: t("large") },
        { value: "veryLarge", label: t("veryLarge") },
      ],
      validate: t("validateCompanySize"),
    },
    monthlyRevenue: {
      label: t("monthlyRevenue"),
      options: [
        { value: "under50", label: t("under50") },
        { value: "50to100", label: t("50to100") },
        { value: "100to250", label: t("100to250") },
        { value: "250to500", label: t("250to500") },
        { value: "500to1B", label: t("500to1B") },
        { value: "above1B", label: t("above1B") },
      ],
      validate: t("validateMonthlyRevenue"),
    },
  };
}

const SurveyForm = ({ visible, onClose, data, topicId }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const t = useTranslations("ChatAI.SurveyForm");
  const formFields = translateFormFields(t);
  const { mutateAsync: saveSurvey, isPending:isPendingSave } = useSaveSurvey();
  const { refetch: refetchDataSurvey } = useGetSurvey();
  const { setSurvey } = useUserStore();
  const { chatId, categoryId } = useParams();

  useEffect(() => {
    if (data) {
      const dataSurveyForm = {
        fullName: data?.personalInfo?.name,
        email: data?.personalInfo?.email,
        phoneNumber: data?.personalInfo?.phone,
        companySize: data?.companySize,
        monthlyRevenue: data?.companyRevenue,
        companyAddress: data?.companyAddress,
        companyVision: data?.companyVision,
        companyName: data?.companyName,
        competitiveAdvantage: data?.companyStrength,
        productDescription: data?.companyProduct,
        nextYearPlan: data?.companyNextYearPlan,
      };
      form.setFieldsValue(dataSurveyForm);
    }
  }, [data, form]);

  const handleSubmit = (values) => {
    handleSubmitSurvey(values);
    form.resetFields();
  };

  const handleSubmitSurvey = async (values) => {
    try {
      const data = {
        personalInfo: {
          name: values.fullName,
          email: values.email,
          phone: values.phoneNumber,
        },
        companySize: values.companySize,
        companyRevenue: values.monthlyRevenue,
        companyAddress: values.companyAddress,
        companyVision: values.companyVision,
        companyName:values.companyName,
        companyStrength: values.competitiveAdvantage,
        companyProduct: values.productDescription,
        companyNextYearPlan: values.nextYearPlan,
      };

      await saveSurvey(data)
      .then((res) => {
      toast.info(t("thanks"));
      refetchDataSurvey();
      setSurvey(data);
      if(!chatId && topicId){
          router.push(`/category/${categoryId}/topic/${topicId}/chat/add`);
      }
      })
      .catch((error) => {
        toast.error(t("failded"));
      });
    } catch (error) {
      toast.error(t("failded"));
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex flex-col gap-1">
        <div style={{ color: "#1890FF", fontSize: "20px", fontWeight: "bold" }}>
          {data ? t("formInfo") : t("title")}
        </div>
        <div className="text-sm font-normal text-stone-500">
          {t("helpText")}
        </div>
        </div>
      }
      
      open={visible}
      onCancel={handleCancel}
      footer={null}
      style={{ top: 40 }}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Full Name */}
        <Form.Item
          className="!mb-4"
          name="fullName"
          label={formFields.fullName.label}
          rules={[{ required: true, message: formFields.fullName.validate }]}
        >
          <Input placeholder={formFields.fullName.label} />
        </Form.Item>

        {/* Email and Phone */}
        <div className=" flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Form.Item
            className="!mb-4 flex-1"
            name="email"
            label={formFields.email.label}
            rules={[
              { required: true, message: formFields.email.validate },
              { type: "email", message: t("invalidEmail") },
            ]}
          >
            <Input placeholder={formFields.email.label} />
          </Form.Item>
          <Form.Item
            className="!mb-4 flex-1"
            name="phoneNumber"
            label={formFields.phoneNumber.label}
            rules={[
              { required: true, message: formFields.phoneNumber.validate },
              { pattern: /^\d+$/, message: t("validateNumber") },
            ]}
          >
            <Input placeholder={formFields.phoneNumber.label} />
          </Form.Item>
        </div>

        <Form.Item
            className="!mb-4"
            key={'companyName'}
            name={'companyName'}
            label={formFields['companyName'].label}
            rules={[
              { required: true, message: formFields['companyName'].validate },
            ]}
          >
            <Input placeholder={formFields['companyName'].label} />
          </Form.Item>

        {/* Company Size and Monthly Revenue */}
        {["companySize", "monthlyRevenue"].map((fieldName) => (
          <Form.Item
            className="!mb-4"
            key={fieldName}
            name={fieldName}
            label={formFields[fieldName].label}
            rules={[
              { required: true, message: formFields[fieldName].validate },
            ]}
          >
            <Select placeholder={formFields[fieldName].label} allowClear>
              {formFields[fieldName].options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ))}

        {/* Additional Inputs */}
        {[
          "companyAddress",
          "companyVision",
          "competitiveAdvantage",
          "productDescription",
          "nextYearPlan",
        ].map((fieldName) => (
          <Form.Item
            className="!mb-4"
            key={fieldName}
            name={fieldName}
            label={formFields[fieldName].label}
            rules={[
              { required: true, message: formFields[fieldName].validate },
            ]}
          >
            <Input placeholder={formFields[fieldName].label} />
          </Form.Item>
        ))}

        {/* <Label>{t("thanks")}</Label> */}

        {/* Buttons */}
        <Form.Item className="!mb-4 flex justify-end">
          <Button onClick={handleCancel} className="mr-2">
            {t("cancel")}
          </Button>
          <Button type="primary" htmlType="submit" loading={isPendingSave}>
            {data ? t("edit") : t("submit")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SurveyForm;
