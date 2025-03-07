import Cookies from "js-cookie";
export default function Categories({ categories }) {
    const locale = Cookies.get("NEXT_LOCALE") || 'vi';
    console.log(`🚀 ~ locale:`, locale)
    return (
      <div className="mt-6 px-4 md:px-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Gợi ý dành riêng cho bạn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories?.map((cat) => {
           const context = cat.contexts.find((ctx) => "vi" == locale ) ? cat.contexts[0] : cat.contexts[1];
            console.log(`🚀 ~ context:`, context)
            return (
              <div
                key={cat._id}
                className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4"
              >
                <img
                  src={cat.image}
                  alt={context.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{context.name}</h4>
                  <p className="text-sm text-gray-600">{context.description}</p>
                  <a
                    href="#"
                    className="text-[#52c6d9] text-sm mt-1 inline-block font-medium hover:underline transition"
                  >
                    Xem thêm →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  