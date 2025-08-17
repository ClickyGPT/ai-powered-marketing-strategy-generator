
import React, { useState } from 'react';

interface StrategyFormProps {
    onGenerate: (businessDescription: string) => void;
    isLoading: boolean;
}

export const StrategyForm: React.FC<StrategyFormProps> = ({ onGenerate, isLoading }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(description);
    };

    return (
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit}>
                <label htmlFor="business-description" className="block text-lg font-semibold text-gray-800 mb-2">
                    Describe Your Business or Product
                </label>
                <p className="text-sm text-gray-500 mb-4">
                    Provide a few sentences about what you do, who your customers are, and your goals. The more detail, the better the strategy.
                </p>
                <textarea
                    id="business-description"
                    rows={5}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="e.g., We are a new e-commerce store selling handmade, sustainable pet toys to environmentally-conscious dog owners in North America."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                />
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        disabled={isLoading || !description.trim()}
                        className="button button-primary inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating Strategy...
                            </>
                        ) : (
                            'Generate Strategy'
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
};
