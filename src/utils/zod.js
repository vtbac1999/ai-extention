import { object, string, z } from "zod";

export const UserProfileSchema = object({
  firstName: string({ required_error: "Trường này là bắt buộc" }).min(
    1,
    "Trường này là bắt buộc"
  ),
  lastName: string({ required_error: "Trường này là bắt buộc" }).min(
    1,
    "Trường này là bắt buộc"
  ),
  email: string({ required_error: "Trường này là bắt buộc" })
    .min(1, "Trường này là bắt buộc")
    .email("Email không đúng định dạng"),
  phoneNumber: string()
    .min(1, "Trường này là bắt buộc")
    .max(15, "Số điện thoại phải ít hơn 15 ký tự")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số"),
});

export const ChangePasswordSchema = object({
  oldPassword: string({ required_error: "Trường này là bắt buộc" }).min(
    1,
    "Trường này là bắt buộc"
  ),
  newPassword: string({ required_error: "Trường này là bắt buộc" }).min(
    1,
    "Trường này là bắt buộc"
  ),
  confirmNewPassword: string({ required_error: "Trường này là bắt buộc" }).min(
    1,
    "Trường này là bắt buộc"
  ),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  path: ["confirmNewPassword"],
  message: "Xác nhận mật khẩu mới phải trùng với mật khẩu mới",
});

export const LoginSchema = (t) => {
return z.object({
    email: z
      .string()
      .min(1,t("Form.Message.EmailRequired"))
      .email(t("Form.Message.EmailInvalid")),
    password: z
      .string()
      .min(1, t("Form.Message.PasswordRequired"))
      .min(6, t("Form.Message.PasswordInvalid")),
  });
}

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "Họ là bắt buộc"),
    lastName: z.string().min(1, "Tên là bắt buộc"),
    email: z
      .string()
      .email("Email không đúng định dạng")
      .min(1, "Email là bắt buộc"),
    phone: string()
      .min(1, "Trường này là bắt buộc")
      .max(15, "Số điện thoại phải ít hơn 15 ký tự")
      .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    agreement: z.literal(true, {
      errorMap: () => ({
        message: "Bạn phải đồng ý với điều khoản và chính sách bảo mật!",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không khớp",
  });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không đúng định dạng"),
});
