"use client";

import ProjectCard from "@/components/features/ProjectCard";
import { projects } from "@/lib/data";
import { ProjectTag } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";

const tags: (ProjectTag | "すべて")[] = [
    "すべて",
    "BigQuery",
    "LLM（生成AI）",
    "Chrome拡張",
    "GAS",
    "Webアプリ",
];

export default function ProjectsPage() {
    const [selectedTag, setSelectedTag] = useState<ProjectTag | "すべて">("すべて");

    const filteredProjects = projects.filter(
        (project) => selectedTag === "すべて" || project.tags.includes(selectedTag)
    );

    return (
        <main className="min-h-screen px-4 pt-24 pb-12 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        プロジェクト一覧
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        AI事業部が開発したツール・ソリューションをご紹介します。
                    </p>
                </motion.div>

                {/* Tag Filter */}
                <div className="mb-12 flex flex-wrap justify-center gap-2">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${selectedTag === tag
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">このカテゴリにはプロジェクトがありません。</p>
                    </div>
                )}
            </div>
        </main>
    );
}
