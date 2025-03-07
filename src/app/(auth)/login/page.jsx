"use client";

import { useLogin } from "@/api/auth";
import { useGetProfile } from "@/api/profile";
import GoogleLoginButton from "@/components/auth/google_login_button";
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
import { LoginSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("ChatAI.Page.Login");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const formMethods = useForm({
    resolver: zodResolver(LoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { refetch: refetchProfile } = useGetProfile();
  const { mutate: login, isPending } = useLogin();
  const [message, setMessage] = useState();

  const handleLogin = (data) => {
    login(data, {
      onSuccess: () => {
        toast.info(t("Form.Message.Success"));
        router.push("/");
        refetchProfile();
      },
      onError: (error) => {
        setMessage(error.response?.data.message || error.message)
      },
    });
  };

  const renderFormLoginByEmail = () => (
    <Form {...formMethods}>
      <form
        className="flex flex-col gap-4"
        onSubmit={formMethods.handleSubmit(handleLogin)}
      >
        <FormField
          name="email"
          control={formMethods.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder={t("Form.Email")} {...field} className='h-10 border-[#7F8C8E] placeholder:text-[#7F8C8E]' />
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
                <div>
                  <div className="relative flex gap-3 items-center rounded-md border border-input !border-[#7F8C8E] ">
                    <Input
                      className="border-none h-10 placeholder:text-[#7F8C8E]"
                      type={isShowPassword ? "text" : "password"}
                      placeholder={t("Form.Password")}
                      {...field}
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
                  <strong className="mt-1 font-medium block text-end cursor-pointer text-[#50C6D9] text-xs">
                    <Link href="/forgot-password">{t("Form.ForgotPassword")}</Link>
                  </strong>
                </div>
              </FormControl>
              <FormMessage className='text-red-600'>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        {message && (
          <FormMessage className='text-red-600'>{message}</FormMessage>
        )}

        <div className="text-center mt-2">
          <Button
            type="submit"
            className="w-full  text-white bg-[#50C6D9] hover:bg-[#50C6D9] h-10"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : t("Form.ButtonSubmit")}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="form-wrapper flex flex-col items-center gap-5">
      <div className="w-full">{renderFormLoginByEmail()}</div>
      <p className="text-sm">{t("Form.Footer.Or")}</p>
      <div className=" flex flex-col gap-3">
        <GoogleLoginButton />
        {/* <FacebookLoginButton /> */}
      </div>
    </div>
  );
}
