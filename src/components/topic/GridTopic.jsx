import { useGetTopics } from "@/api/topic";
import { fakeDataTopic } from "@/common/constant/fakeDateTopic";
import { useEffect, useState } from "react";
import SurveyForm from "../survey-form/SurveyForm";
import CardTopic from "./CardTopic";
import { useLocale } from "next-intl";
import { LIMIT } from "@/common/constant/constant";

export default function GridTopic({
  categoryId,
  setCategoryName,
  setTotalPage,
  query,
}) {
  const { data: topics } = useGetTopics(
    categoryId,
    query.keyword,
    query.page,
    query.limit
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [topicId, setTopicId] = useState(null);

  const locale = useLocale() || 'vi';

  useEffect(() => {
    if (topics && topics?.result) {
      setTotalPage(Math.ceil(topics?.result?.totalItems / LIMIT));
      if (topics?.result?.category?.contexts) {
        const data = topics?.result?.category?.contexts.find(
          (context) => context?.language == locale
        );
        if (data) {
          setCategoryName(data?.name);
        }
      }
    }
  }, [topics]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderListCardTopic = () => {
    let data = topics?.result?.items || [];
    return data?.map((topic) => {
      return (
        <CardTopic
          key={topic?._id}
          id={topic?._id}
          image={topic?.image}
          contexts={topic?.topicContextDetails}
          handleOpenModal={handleOpenModal}
          setTopicId={setTopicId}
        />
      );
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {renderListCardTopic()}
      <SurveyForm visible={isModalVisible} onClose={handleCloseModal} topicId={topicId} />
    </div>
  );
}
