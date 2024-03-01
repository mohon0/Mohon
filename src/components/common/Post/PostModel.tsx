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
    <Card className="group relative my-4 h-fit">
      <Link href={`/blog/${category}/${encodedTitle}`}>
        <Image
          className=" h-auto w-full rounded-md transition-all duration-300 sm:group-hover:brightness-50"
          src={img}
          alt={title}
          height={400}
          width={400}
        />

        <div className="flex-col justify-between gap-4 px-3 py-3 group-hover:flex sm:absolute sm:bottom-0 sm:hidden">
          <div className=" text-lg font-bold">{title}</div>
        </div>
      </Link>
    </Card>
  );
}
