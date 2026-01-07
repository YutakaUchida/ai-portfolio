"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:shadow-lg hover:border-primary/30"
        >
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40 transition-opacity group-hover:opacity-20" />

                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md border border-primary/20 shadow-sm">
                    {project.category}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <Link
                        href={project.link || "#"}
                        target="_blank"
                        className="rounded-full p-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-100 hover:text-primary"
                    >
                        <ArrowUpRight className="h-5 w-5" />
                    </Link>
                </div>

                <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>
            </div>

            <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10">
                <span className="sr-only">View project {project.title}</span>
            </Link>
        </motion.div>
    );
}
