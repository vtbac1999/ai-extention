"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { useUserStore } from "@/stores/useUserStore";
import { MoveRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CardTopic({ id, contexts, handleOpenModal, image, setTopicId }) {
    const t = useTranslations("ChatAI.Page.Category");
    const locale =useLocale() || 'vi';
    const [dataCardTopic, setDataCardTopic] = useState({});
    const { categoryId} = useParams();

    const { dataUser, survey } = useUserStore();
    const isLogged = dataUser.isLogged;

    useEffect(() => {
        if (contexts && contexts.length > 0) {
            const data = contexts.find((context) => context?.language == locale);
            setDataCardTopic(data);
        }
    }, [contexts, locale])

    const handleOpenFormSurvey = () => {
        handleOpenModal();
        setTopicId(id);
    }
    return (
        <Card className="flex flex-col p-4 rounded-xl gap-4">
            <div className="w-full h-full ">
                <Image
                    src={image}
                    width={140}
                    height={140}
                    alt={dataCardTopic?.name}
                    className="rounded-xl w-full h-[200px] object-cover"

                />
            </div>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">{dataCardTopic?.name}</h2>
                    <p className="text-base">{dataCardTopic?.description}</p>
                </div>

                {(!isLogged || isLogged && survey?.companySize )? (
                    <Link
                        href={`/category/${categoryId}/topic/${id}/chat/add`}
                        className="flex gap-2 justify-end items-center"
                    >
                        <p>{t("SeeMore")}</p>
                        <MoveRight size={14} />
                    </Link>
                ) : (
                    <Button
                        onClick={handleOpenFormSurvey}
                        className="flex gap-2 justify-end items-center shadow-none"
                    >
                        <p>{t("SeeMore")}</p>
                        <MoveRight size={14} />
                    </Button>
                )}
            </div>
        </Card>
    )
}