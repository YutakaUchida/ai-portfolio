export type ProjectTag = "BigQuery" | "LLM（生成AI）" | "Chrome拡張" | "GAS" | "Webアプリ";

export interface ProjectStep {
    type: "image" | "video";
    url: string;
    title: string;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    problem?: string; // 解決する課題
    features?: string[]; // 主な機能
    tags: ProjectTag[]; // 複数タグ
    imageUrl: string;
    technologies: string[];
    link?: string;
    githubUrl?: string;
    featured: boolean;
    completionDate?: string;
    steps?: ProjectStep[];
    savedHours?: number; // 効率化した時間（時間単位）
    // 売上・インパクト金額を直接指定する場合
    impactAmount?: number; // 金額（円）
    impactLabel?: string; // 金額の種類（例: "売上（月額）", "売上（単発）", "年間インパクト"）
}
