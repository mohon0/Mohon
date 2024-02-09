import ProjectSlider from "./ProjectSlider";
import ProjectsHeader from "./ProjectsHeader";

export default function Projects() {
  return (
    <div
      className="flex items-center justify-center flex-col lg:gap-10"
      id="project"
    >
      <ProjectsHeader />
      <ProjectSlider />
    </div>
  );
}
