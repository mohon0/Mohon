import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type props = {
  title: string;
  img: string;
  category: string;
};

export default function PostModel({ title, img, category }: props) {
  const encodeForUrl = (str: string) => {
    return encodeURIComponent(str).toLowerCase().replace(/%20/g, "_");
  };

  const encodedTitle = title ? encodeForUrl(title) : "";

  return (
    <Card>
      <Link href={`/blog/${category}/${encodedTitle}`}>
        <div className="h-52">
          <Image
            className="h-52 w-full  rounded-lg object-scale-down"
            src={img}
            alt={title}
            height={300}
            width={300}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 px-3 py-3">
          <div className=" text-lg font-bold">{title}</div>
        </div>
      </Link>
    </Card>
  );
}
