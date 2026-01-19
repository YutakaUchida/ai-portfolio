import { projects } from "@/lib/data";
import StepCarousel from "@/components/features/StepCarousel";
import { ArrowLeft, ExternalLink, Github, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const hourlyRate = 2000; // 時給単価

const formatAmount = (amount: number) => {
    if (amount >= 10000) {
        return `${Math.round(amount / 10000)}万円`;
    }
    return `${amount.toLocaleString()}円`;
};

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
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                                >
                                    {tag}
                                </span>
                            ))}
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

                {/* 解決する課題 */}
                {project.problem && (
                    <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
                        <h3 className="mb-3 text-lg font-semibold text-amber-800 flex items-center gap-2">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-200 text-amber-700 text-sm">?</span>
                            解決する課題
                        </h3>
                        <p className="text-amber-900 leading-relaxed">
                            {project.problem}
                        </p>
                    </div>
                )}

                {/* 概要・主な機能 */}
                <div className="mb-10 prose max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900">概要</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {project.longDescription || project.description}
                    </p>

                    {project.features && project.features.length > 0 && (
                        <>
                            <h3 className="mt-8 text-xl font-semibold text-gray-900">主な機能</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </>
                    )}
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

                {/* 効率化した作業時間 */}
                {project.savedHours && project.savedHours > 0 && (
                    <div className="mb-10 rounded-xl border border-green-200 bg-green-50 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="h-6 w-6 text-green-600" />
                            <h3 className="text-lg font-semibold text-green-800">効率化した作業時間</h3>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg bg-white/80 p-4 border border-green-200">
                                <div className="text-3xl font-bold text-green-700">{project.savedHours.toLocaleString()}時間</div>
                                <div className="text-sm text-green-600">年間の削減時間</div>
                            </div>
                            <div className="rounded-lg bg-white/80 p-4 border border-green-200">
                                <div className="text-3xl font-bold text-green-700">{formatAmount(project.savedHours * hourlyRate)}</div>
                                <div className="text-sm text-green-600">時給{hourlyRate.toLocaleString()}円換算</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 売上・インパクト金額 */}
                {project.impactAmount && project.impactAmount > 0 && (
                    <div className="mb-10 rounded-xl border border-blue-200 bg-blue-50 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                            <h3 className="text-lg font-semibold text-blue-800">ビジネスインパクト</h3>
                        </div>
                        <div className="rounded-lg bg-white/80 p-4 border border-blue-200">
                            <div className="text-3xl font-bold text-blue-700">{formatAmount(project.impactAmount)}</div>
                            <div className="text-sm text-blue-600">{project.impactLabel || "年間インパクト"}</div>
                        </div>
                    </div>
                )}

                {/* 使用技術 */}
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
            </div>
        </main>
    );
}
