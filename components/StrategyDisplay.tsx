
import React from 'react';
import type { Strategy, StrategySection } from '../types';
import { SemIcon, SeoIcon, SmeoIcon } from '../constants';
import { StrategyCard } from './StrategyCard';

interface SectionProps {
    section: StrategySection;
    icon: React.ReactNode;
    colorClass: string;
}

const SectionDisplay: React.FC<SectionProps> = ({ section, icon, colorClass }) => (
    <div className="mb-12">
        <div className="flex items-center mb-4">
            <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
                {icon}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                <p className="text-gray-600 mt-1">{section.summary}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.points.map((point, index) => (
                <StrategyCard key={index} point={point} />
            ))}
        </div>
    </div>
);


export const StrategyDisplay: React.FC<{ strategy: Strategy }> = ({ strategy }) => {
    return (
        <section className="mt-12 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">Your Custom Marketing Strategy</h2>
            
            <SectionDisplay 
                section={strategy.seo} 
                icon={<SeoIcon className="w-7 h-7 text-white" />} 
                colorClass="bg-blue-500"
            />
            
            <SectionDisplay 
                section={strategy.sem} 
                icon={<SemIcon className="w-7 h-7 text-white" />} 
                colorClass="bg-green-500"
            />
            
            <SectionDisplay 
                section={strategy.smeo} 
                icon={<SmeoIcon className="w-7 h-7 text-white" />} 
                colorClass="bg-purple-500"
            />
        </section>
    );
};
