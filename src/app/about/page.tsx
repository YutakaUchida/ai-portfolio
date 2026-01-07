"use client";

import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import { Brain, Cpu, Globe, Zap } from "lucide-react";

// プロジェクトデータから統計を計算
const totalProjects = projects.length;
const totalSavedHours = projects.reduce((sum, p) => sum + (p.savedHours || 0), 0);
const uniqueCategories = new Set(projects.map((p) => p.category)).size;

const stats = [
    { label: "開発プロジェクト数", value: `${totalProjects}` },
    { label: "効率化した作業時間", value: `${totalSavedHours}h` },
    { label: "社内利用者数", value: "50+" },
    { label: "活用ツール種別", value: `${uniqueCategories}` },
];

const values = [
    {
        icon: Zap,
        title: "業務効率化",
        description: "繰り返し作業を自動化し、本質的な業務に集中できる環境を作ります。",
    },
    {
        icon: Globe,
        title: "社内展開",
        description: "開発したツールは社内で広く共有し、組織全体の生産性向上に貢献します。",
    },
    {
        icon: Brain,
        title: "継続的改善",
        description: "利用者のフィードバックを元に、ツールを継続的にアップデートしています。",
    },
    {
        icon: Cpu,
        title: "技術活用",
        description: "最新のAI技術やクラウドサービスを積極的に取り入れ、効果的なソリューションを提供します。",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white px-4 pt-24 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-20 text-center"
                >
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        AI事業部について
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-gray-600">
                        私たちは業務効率化のためのツール開発を行うチームです。
                        Chrome拡張機能やGASを活用し、社内の様々な課題を解決しています。
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-20 grid grid-cols-2 gap-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:grid-cols-4"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="mb-2 text-3xl font-bold text-primary sm:text-4xl">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Mission */}
                <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">私たちのミッション</h2>
                        <div className="space-y-6 text-gray-600">
                            <p>
                                AI事業部は、社内の業務効率化を推進するチームです。
                                日々の業務で発生する繰り返し作業や手作業を自動化し、
                                社員がより創造的な業務に集中できる環境を整えることを目指しています。
                            </p>
                            <p>
                                Chrome拡張機能、Google Apps Script、Python自動化スクリプトなど、
                                適材適所のツールを選択し、現場のニーズに合わせたソリューションを提供しています。
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-blue-50 to-orange-50 border border-gray-100"
                    >
                        {/* Abstract visual representation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Brain className="h-32 w-32 text-primary/40" />
                        </div>
                    </motion.div>
                </div>

                {/* Values */}
                <div>
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">私たちの強み</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                                    <value.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
