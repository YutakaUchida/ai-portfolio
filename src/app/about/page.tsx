"use client";

import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import { Brain, Cpu, Globe, Zap, Target } from "lucide-react";

// プロジェクトデータから統計を計算
const totalProjects = projects.length;
const totalSavedHours = projects.reduce((sum, p) => sum + (p.savedHours || 0), 0);
const uniqueTechnologies = new Set(projects.flatMap((p) => p.technologies)).size;
const hourlyRate = 2000; // 時給単価
// 削減時間の金額換算 + 直接指定の売上・インパクト金額
const totalImpactAmount = projects.reduce((sum, p) => sum + (p.impactAmount || 0), 0);
const totalSavedAmount = totalSavedHours * hourlyRate + totalImpactAmount;

// 金額をフォーマット（万円単位）
const formatAmount = (amount: number) => {
    if (amount >= 10000) {
        return `${Math.round(amount / 10000)}万円`;
    }
    return `${amount.toLocaleString()}円`;
};

const stats = [
    { label: "開発プロジェクト数", value: `${totalProjects}` },
    { label: "効率化した作業時間", value: `${totalSavedHours.toLocaleString()}h` },
    { label: "削減金額（時給換算）", value: formatAmount(totalSavedAmount) },
    { label: "活用技術", value: `${uniqueTechnologies}` },
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
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">チームミッション</h2>
                        <div className="space-y-6 text-gray-600">
                            <p className="text-lg font-medium text-gray-800">
                                全社のAI活用を推進することで、生産性の向上および新たな事業価値の創出に貢献する
                            </p>
                            <p>
                                インターゾーンの拡大＝人員・人件費の拡大とするのではなく、
                                AI活用を前提とした業務改革を進めることで、売上が拡大しても現在の人員で耐えうる仕組みをつくり、
                                収益性を飛躍的に向上させることを目指しています。
                            </p>
                            <p>
                                また社内改善の事例を事業につなげることで、さらなる事業拡大に貢献します。
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-blue-50 to-orange-50 border border-gray-100 p-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-bold text-gray-900">年間目標</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-lg bg-white/80 p-4 border border-gray-200">
                                <div className="text-3xl font-bold text-primary mb-1">3,000万円</div>
                                <div className="text-sm text-gray-600">売上 + 業務改善インパクトの合計</div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-2">
                                <p><span className="font-medium">売上：</span>AI活用による他部署の販売サポート</p>
                                <p><span className="font-medium">業務改善：</span>削減業務時間 × 時給単価で算出</p>
                            </div>
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
