import CategorySection from "@/components/core/CategorySection";
import RecentPost from "@/components/core/RecentPost";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col w-full gap-16">
        <RecentPost />
        <div className="lg:hidden">
          <CategorySection />
        </div>
      </div>
    </main>
  );
}
