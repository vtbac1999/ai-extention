"use client";

import { useForgotPassword } from "@/api/auth";
import ModalSuccess from "@/components/notification/ModalSuccess";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import { ForgotPasswordSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState();
  const formMethods = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: forgotPassword,
    isPending,
    isError,
    isSuccess,
  } = useForgotPassword();

  const handleSubmit = (data) => {
    forgotPassword(data, {
      onSuccess: () => {
        setShowModal(true);
        setMessage("Vui lòng kiểm tra email để lấy lại mật khẩu");
      },
      onError: (error) => {
        setMessage("Email chưa kết nối với tài khoản nào");
      },
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col items-center py-3">
        <h2 className="text-xl font-semibold mb-4 text-[#50C6D9]">Quên mật khẩu?</h2>
        <p className="text-center text-sm text-gray-600 px-4">
          Hãy nhập email đăng ký tài khoản của bạn, để nhận hướng dẫn lấy lại
          mật khẩu
        </p>
      </div>

      <Form {...formMethods}>
        <form
          className="w-[100%]"
          onSubmit={formMethods.handleSubmit(handleSubmit)}
        >
          <FormField
            name="email"
            control={formMethods.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <div className="text-center mt-4">
            <Button
              type="submit"
              className="w-full  text-white bg-[#50C6D9] hover:bg-[#50C6D9]"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Gửi yêu cầu"}
            </Button>
            {/* {isSuccess && <p className="text-green-500 mt-2">{message}</p>} */}
            {isError && <p className="text-red-500 mt-2">{message}</p>}
          </div>
        </form>
      </Form>

      <p className="text-center mt-3 text-sm">
        Quay lại trang{" "}
        <strong className="cursor-pointer text-[#50C6D9] hover:underline">
          <Link href="/login">đăng nhập.</Link>
        </strong>
      </p>
      {
        showModal &&
        <ModalSuccess message={message} onClickButonClose={handleCloseModal} />
      }
    </div>
  );
};

export default ForgotPasswordPage;
