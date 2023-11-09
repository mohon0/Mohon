import Image from "next/image";
import Link from "next/link";

type props = {
  title: string;
  des: string;
  img: string;
  category: string;
};

export default function PostModel({ title, des, img, category }: props) {
  // Function to properly encode a string for URLs
  const encodeForUrl = (str: string) => {
    return encodeURIComponent(str).replace(/%20/g, "_");
  };

  const encodedTitle = title ? encodeForUrl(title) : "";
  const plainTextContent = des ? des.replace(/<[^>]+>/g, "") : "";
  const sum = plainTextContent
    .slice(0, 150)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

  return (
    <div className="border border-gray-600 rounded-lg">
      <Link href={`/blog/${category}/${encodedTitle}`} className="">
        <Image
          className="w-full h-60 object-cover rounded-lg"
          src={img}
          alt={title}
          height={300}
          width={300}
        />
        <div className="flex flex-col justify-between px-3 py-3 gap-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-400 text-base ">{sum}</p>
          <p className="flex justify-end">
            <span className="bg-blue-950 hover:bg-blue-900 px-4 py-1.5 rounded-full">
              Read More
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
