
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StrategyForm } from './components/StrategyForm';
import { StrategyDisplay } from './components/StrategyDisplay';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { generateStrategy } from './services/geminiService';
import type { Strategy } from './types';

const App: React.FC = () => {
    const [strategy, setStrategy] = useState<Strategy | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateStrategy = useCallback(async (businessDescription: string) => {
        if (!businessDescription.trim()) {
            setError("Please provide a description of your business.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setStrategy(null);

        try {
            const result = await generateStrategy(businessDescription);
            setStrategy(result);
        } catch (err) {
            console.error("Error generating strategy:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main id="site-main" className="flex-grow">
                <Hero />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <StrategyForm onGenerate={handleGenerateStrategy} isLoading={isLoading} />
                    
                    {isLoading && <Loader />}

                    {error && (
                        <div className="mt-8 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {strategy && !isLoading && <StrategyDisplay strategy={strategy} />}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
