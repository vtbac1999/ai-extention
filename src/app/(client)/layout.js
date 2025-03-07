'use client';

import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import Navigation from "@/components/common/Navigation/Navigation";
import { useNavigationStore } from "@/stores/useNavigationStore";
import { useParams } from "next/navigation";

export default function ClientLayout({ children }) {
    const { openNavigation } = useNavigationStore();
    const params = useParams();

    return (
        <main>
            <Header />
            <div className="flex">
                <Navigation />
                <div className={`${openNavigation ? 'ml-[250px]' : params?.chatId ? 'ml-0' : 'ml-[150px]'} w-full mt-[50px]`}>
                   {children}
                </div>
            </div>
            <Footer />
        </main>
    )
}