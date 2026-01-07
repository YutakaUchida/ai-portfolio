"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
            {/* Background Elements - Light Mode */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
            <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary shadow-sm"
            >
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">AI事業部 ポートフォリオ</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mb-8 max-w-5xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
                <span className="text-gray-900">人間とAI、</span>
                <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">次なる創発へ。</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 sm:text-xl"
            >
                業務効率化のためのChrome拡張機能やGASツールなど、
                社内で活用できる様々なプロジェクトを開発しています。
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
                <Link
                    href="/projects"
                    className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
                >
                    プロジェクト一覧
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                    href="/about"
                    className="flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400"
                >
                    概要を見る
                </Link>
            </motion.div>
        </section>
    );
}
