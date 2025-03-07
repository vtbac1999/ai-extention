import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full p-6 flex flex-col md:flex-row items-center justify-between">
      {/* Hình ảnh banner */}
      <Image
        src="/images/banner-new.png"
        alt="AI Assistant"
        width={800}
        height={400}
        className="w-full h-auto max-w-[500px] md:max-w-none object-cover rounded-lg"
        priority
      />
    </div>
  );
}
