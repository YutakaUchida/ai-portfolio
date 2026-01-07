"use client";

import { ProjectStep } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface StepCarouselProps {
    steps: ProjectStep[];
}

export default function StepCarousel({ steps }: StepCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    };

    const goToStep = (index: number) => {
        setCurrentIndex(index);
    };

    const currentStep = steps[currentIndex];

    // YouTube URLからembed URLに変換
    const getEmbedUrl = (url: string) => {
        // YouTube動画の場合
        const youtubeMatch = url.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
        );
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
        }
        return url;
    };

    return (
        <div className="w-full">
            {/* ステップインジケーター */}
            <div className="mb-4 flex flex-wrap justify-center gap-2">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        onClick={() => goToStep(index)}
                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            index === currentIndex
                                ? "bg-primary text-white shadow-lg shadow-primary/25"
                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                            index === currentIndex ? "bg-white/20" : "bg-gray-100"
                        }`}>
                            {index + 1}
                        </span>
                        <span className="hidden sm:inline">{step.title}</span>
                    </button>
                ))}
            </div>

            {/* メインコンテンツエリア */}
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
                {/* メディア表示エリア */}
                <div className="relative aspect-video w-full bg-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            {currentStep.type === "image" ? (
                                <Image
                                    src={currentStep.url}
                                    alt={currentStep.title}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="relative h-full w-full">
                                    <iframe
                                        src={getEmbedUrl(currentStep.url)}
                                        title={currentStep.title}
                                        className="absolute inset-0 h-full w-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* 動画アイコンオーバーレイ（画像時のみ、動画がある場合に表示） */}
                    {currentStep.type === "image" && steps.some((s) => s.type === "video") && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-gray-900/70 px-3 py-1.5 text-xs text-white">
                            <Play className="h-3 w-3" />
                            動画あり
                        </div>
                    )}
                </div>

                {/* ナビゲーションボタン */}
                {steps.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900"
                            aria-label="前のステップ"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900"
                            aria-label="次のステップ"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </>
                )}
            </div>

            {/* ステップ説明 */}
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                        {currentIndex + 1}
                    </span>
                    <div>
                        <h4 className="font-semibold text-gray-900">{currentStep.title}</h4>
                        <p className="mt-1 text-sm text-gray-600">{currentStep.description}</p>
                    </div>
                </div>
            </div>

            {/* ドットインジケーター */}
            <div className="mt-4 flex justify-center gap-2">
                {steps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToStep(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === currentIndex
                                ? "w-6 bg-primary"
                                : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`ステップ ${index + 1} へ移動`}
                    />
                ))}
            </div>
        </div>
    );
}

