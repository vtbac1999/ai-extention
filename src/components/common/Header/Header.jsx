import { Card } from "@/components/ui/card";
import { useNavigationStore } from "@/stores/useNavigationStore";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { UserNav } from "../Avatar/UserNav";

export default function Header(){
    const { openNavigation } = useNavigationStore();

    return(
        <div className={`${openNavigation ? 'ml-[250px]' : 'ml-[120px]'} fixed h-[50px] z-[9] w-full top-0 right-0 bg-white`} >
            <Card className="h-full w-full rounded-none border-none px-4 md:px-6 flex items-center justify-end">
                <div className="flex gap-2">
                    <LanguageSwitcher/>
                    <UserNav/>
                </div>
            </Card>
        </div>
    )
}