import HeroSection from "@/components/features/HeroSection";
import ProjectCard from "@/components/features/ProjectCard";
import { projects } from "@/lib/data";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section id="projects" className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            注目のプロジェクト
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            特に効果的だったツールやソリューションをご紹介します。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
