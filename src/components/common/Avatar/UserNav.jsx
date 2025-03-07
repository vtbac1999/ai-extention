import { useGetProfile } from "@/api/profile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";
import { LogIn, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import avatarDefault from "../../../../public/images/avatar-non.jpg";
import { useQueryClient } from "@tanstack/react-query";

export function UserNav() {
  const t = useTranslations("ChatAI.UserProfile");
  const { dataUser, setDataUser } = useUserStore();
  const { data: getProfile } = useGetProfile();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (getProfile?.result) {
      const data = getProfile.result;
      setDataUser({
        id: data?.id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phone: data?.phone,
        avatar: data?.avatar,
        isLogged: true,
      });
    }
  }, [getProfile]);

  const handleLogout = () => {
    setDataUser({ id: "", firstName: "", lastName: "", email: "", phone: "", avatar: "", isLogged: false });
    queryClient.removeQueries();
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="h-10 w-10 border-2 rounded-full cursor-pointer">
            <AvatarImage src={dataUser?.avatar || avatarDefault.src} alt="Avatar" />
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
       className="w-48 bg-white z-[1000] shadow-lg rounded-md border"
       align="start"
       forceMount
      >
        {dataUser?.isLogged ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer p-3 sm:text-center">
                <Link href={"/profile"} className="w-full flex items-center gap-2 hover:bg-gray-300 p-2 rounded-md">
                  <User size={18} />
                  <p>{t("Profile")}</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer p-3 hover:bg-gray-200 sm:text-center">
              <div className="w-full flex items-center gap-2 p-2 rounded-md">
                <LogOut size={18} />
                <p>{t("Logout")}</p>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer p-3 hover:bg-gray-200 sm:text-center">
            <div className="w-full flex items-center gap-2 p-2 rounded-md">
              <LogIn size={18} />
              <p>{t("Login")}</p>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
