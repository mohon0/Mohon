export default function LoadingAnimation() {
  return (
    <div>
      <div className="loading before:animate-move absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-[whitesmoke] before:absolute before:left-0 before:top-0 before:h-full before:w-[150px] before:skew-x-[20deg] before:bg-white">
        <span className="text-8xl tracking-wider mix-blend-difference">
          LOADING
        </span>
      </div>
      <ul className="absolute inset-0 mt-40 flex items-center justify-center">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <li
            key={index}
            className={`animate-ani h-12 w-12 rounded-full`}
            style={{
              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
              boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
              animationDelay: `${index * 0.2}s`,
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
}
