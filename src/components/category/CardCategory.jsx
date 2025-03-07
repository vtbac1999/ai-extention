
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Card } from "../ui/card";
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function CardCategory({ id, contexts, image }) {
    const t = useTranslations('ChatAI.Common.Texts');
    const locale =useLocale() || 'vi';
    const [dataCardCate, setDataCardCate] = useState({});

    useEffect(() => {
        if (contexts && contexts.length > 0) {
            const data = contexts.find((context) => context?.language == locale);
            setDataCardCate(data);
        }
    }, [contexts, locale])

    return (
        <Card className="flex p-4 rounded-xl gap-4">
            <div className="card-media">
                <Image
                    src={image}
                    alt="Thumbnail_Card_Category"
                    width={120}
                    height={120}
                    className="rounded-xl w-full h-full min-w-[100px] min-h-[100px] max-w-[120px] object-cover"
                />
            </div>
            <div className="card-info w-full h-full flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold">
                        {dataCardCate?.name}
                    </h2>
                    <p>
                        {dataCardCate?.description}
                    </p>
                </div>
                <Link className="flex gap-2 justify-end items-center" href={`/category/${id}`}><span>{t('SeeMore')}</span><ArrowRight size={14} /></Link>
            </div>
        </Card>
    )
}