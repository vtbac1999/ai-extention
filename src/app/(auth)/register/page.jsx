"use client";

import { useRegister } from "@/api/auth";
import ModalError from "@/components/notification/ModalError";
import ModalSuccess from "@/components/notification/ModalSuccess";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { RegisterSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "antd";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState();
  const [message, setMessage] = useState();

  const { mutate: register, isPending } = useRegister();

  const formMethods = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      // fullname: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreement: true,
    },
  });

  const handleRegister = (data) => {
    const { confirmPassword, agreement, ...userData } = data;
    register(userData, {
      onSuccess: () => {
        setShowModal(true);
        setMessage("Đăng ký thành công")
      },
      onError: (error) => {
        setMessage(error.response?.data.message || error.message)
      },
    });
  };

  const renderFormRegister = () => (
    <Form {...formMethods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={formMethods.handleSubmit(handleRegister)}
      >
        <FormField
          name="firstName"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Họ" {...field} className=" h-10 placeholder:text-[#7F8C8E] border-[#7F8C8E]" />
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tên" {...field} className=" h-10 placeholder:text-[#7F8C8E] border-[#7F8C8E]" />
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} className=" h-10 placeholder:text-[#7F8C8E] border-[#7F8C8E]" />
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Số di động" {...field} className=" h-10 placeholder:text-[#7F8C8E] border-[#7F8C8E]" />
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex gap-3 items-center rounded-md">
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    {...field}
                    className=" h-10 placeholder:text-[#7F8C8E] border-[#7F8C8E]"
                  />
                  <span
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    className="absolute right-2 text-gray-500 cursor-pointer"
                  >
                    {isShowPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex gap-3 items-center rounded-mdt">
                  <Input
                    type={isShowConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu"
                    {...field}
                    className=" h-10 placeholder:text-[#7F8C8E] border-[#7F8C8E]"
                  />
                  <span
                    onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                    className="absolute right-2 text-gray-500 cursor-pointer"
                  >
                    {isShowConfirmPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="agreement"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <Checkbox checked={field.value} {...field}>
                Tôi đồng ý với{" "}
                <Link href="#" className="text-[#50C6D9] hover:underline">
                  Điều kiện
                </Link>{" "}
                và{" "}
                <Link href="#" className="text-[#50C6D9] hover:underline">
                  Chính sách bảo mật
                </Link>
              </Checkbox>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
              {!showModal && message && (
              <FormMessage className='text-red-600'>{message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <div className="text-center mt-4">
          <Button
            type="submit"
            className="w-full  text-white bg-[#50C6D9] hover:bg-[#50C6D9] h-10"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Đăng ký"}
          </Button>
        </div>
      </form>
    </Form>
  );

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
  }

  return (
    <div className="form-wrapper flex flex-col items-center gap-5">
      <div className="w-full">
        {renderFormRegister()}
      </div>
      {
        showModal &&
        <ModalSuccess message={message} onClickButonClose={handleCloseModal} />
      }

    </div>
  );
}
