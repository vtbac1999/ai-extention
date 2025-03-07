'use client';
import { Card } from "@/components/ui/card"
import { useNavigationStore } from "@/stores/useNavigationStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({ title, icon, tooltip, href }) {
    const pathName = usePathname();
    const {openNavigation} = useNavigationStore();

    return (
        <Link href={href}>
            <Card className={`${pathName == href ? 'bg-[#46b3c4]' : ''} px-4 py-3 rounded-xl border-none cursor-pointer hover:bg-[#46b3c4] text-white shadow-none`}>
                <div className={`${openNavigation ? 'flex-row justify-start' : 'flex-col justify-center'} flex gap-2  items-center`}>
                    <div className="w-[18px]">
                        {icon}
                    </div>
                    <span className="text-center">
                        {title}
                    </span>
                </div>
            </Card>
        </Link>
    )
}