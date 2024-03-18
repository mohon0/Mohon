import Image from "next/image";

interface Author {
  name: string;
  image: string;
  id: string;
}

function AuthorCard({ id, name, image }: Author) {
  return (
    <div className="m-2 flex h-full flex-col justify-between rounded-lg">
      <span className="mx-auto font-bold text-primary underline">
        Author Info
      </span>
      <div className="flex flex-col gap-4 pt-2">
        <div className="h-32 w-full">
          <Image
            src={image}
            alt=""
            className="mx-auto h-full w-80 object-cover"
            height={500}
            width={500}
          />
        </div>
        <div className="flex justify-center px-2">
          <span className="text-xl font-extrabold text-primary">{name}</span>
        </div>
      </div>
    </div>
  );
}

export default AuthorCard;
