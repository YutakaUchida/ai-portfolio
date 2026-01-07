export type ProjectCategory = "Chrome拡張" | "GAS" | "自動化ツール" | "Webアプリ" | "その他";

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
    category: ProjectCategory;
    imageUrl: string;
    technologies: string[];
    link?: string;
    githubUrl?: string;
    featured: boolean;
    completionDate?: string;
    steps?: ProjectStep[];
    savedHours?: number; // 効率化した時間（時間単位）
}
