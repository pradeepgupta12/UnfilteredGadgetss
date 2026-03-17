// components/cards/BlogCard.jsx
import { motion } from "framer-motion";
import { staggerItem } from "../../utils/animations.js";

export default function BlogCard({ blog }) {
  const { title, image, category, categoryColor, author, date, slug } = blog;

  return (
    <motion.a
      href={`/blog/${slug}`}
      variants={staggerItem}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        <span
          className={`absolute top-2 left-2 z-10 text-white text-[10px] font-bold px-2 py-[3px] rounded uppercase tracking-wide ${
            categoryColor?.includes("blue") ? "bg-blue-600" : "bg-orange-500"
          }`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 min-h-[120px] flex flex-col justify-between">
        <p className="font-medium text-sm text-gray-900 leading-relaxed mb-3 line-clamp-3">
          {title}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            By {typeof author === "object" ? author.name : author} • {date}
          </span>

          <span className="text-xs text-orange-500 font-semibold">
            Read More ›
          </span>
        </div>
      </div>
    </motion.a>
  );
}
