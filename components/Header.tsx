
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header id="site-header" className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl" role="img" aria-label="rocket emoji">🚀</span>
                        <h1 className="text-xl font-bold text-gray-800">
                           AI Marketing Strategy Generator
                        </h1>
                    </div>
                    <nav id="site-nav">
                        {/* Future nav links could go here */}
                    </nav>
                </div>
            </div>
        </header>
    );
};
