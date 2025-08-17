
export interface StrategyPoint {
    title: string;
    description: string;
    action: string;
}

export interface StrategySection {
    title: string;
    summary: string;
    points: StrategyPoint[];
}

export interface Strategy {
    sem: StrategySection;
    seo: StrategySection;
    smeo: StrategySection;
}
