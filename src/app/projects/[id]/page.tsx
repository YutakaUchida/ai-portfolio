import { projects } from "@/lib/data";
import StepCarousel from "@/components/features/StepCarousel";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white pb-20 pt-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Link
                    href="/projects"
                    className="mb-8 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-primary"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    プロジェクト一覧に戻る
                </Link>

                {/* 見出し */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
                                {project.category}
                            </span>
                            {project.featured && (
                                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600 border border-amber-200">
                                    注目
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            {project.title}
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-primary/25"
                            >
                                <ExternalLink className="h-4 w-4" />
                                デモを見る
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                            >
                                <Github className="h-4 w-4" />
                                コード
                            </a>
                        )}
                    </div>
                </div>

                {/* 概要・主な機能 */}
                <div className="mb-10 prose max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900">概要</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {project.longDescription || project.description}
                    </p>

                    <h3 className="mt-8 text-xl font-semibold text-gray-900">主な機能</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>業務効率の大幅な改善</li>
                        <li>使いやすいインターフェース</li>
                        <li>安定した動作</li>
                    </ul>
                </div>

                {/* ステップカルーセル or サムネイル画像 */}
                {project.steps && project.steps.length > 0 ? (
                    <div className="mb-10">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">使い方</h2>
                        <StepCarousel steps={project.steps} />
                    </div>
                ) : (
                    <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="relative aspect-video w-full">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* 使用技術・完成日 */}
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                            使用技術
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.completionDate && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                完成日
                            </h3>
                            <p className="text-gray-900">{project.completionDate}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
