import { Button } from "@/components/ui/button";
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
    <div className="rounded-lg border border-gray-600">
      <Link href={`/blog/${category}/${encodedTitle}`} className="">
        <Image
          className="h-60 w-full rounded-lg object-cover"
          src={img}
          alt={title}
          height={300}
          width={300}
        />
        <div className="flex flex-col justify-between gap-4 px-3 py-3">
          <div className="text-xl font-bold">{title}</div>

          <p className="flex justify-end">
            <Button>Read More</Button>
          </p>
        </div>
      </Link>
    </div>
  );
}
