
import React from 'react';
import type { StrategyPoint } from '../types';

export const StrategyCard: React.FC<{ point: StrategyPoint }> = ({ point }) => {
    return (
        <div className="card bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex-grow">
                <h4 className="text-lg font-bold text-gray-900">{point.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{point.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="text-sm font-semibold text-indigo-600">Action Item</h5>
                <p className="mt-1 text-sm text-gray-700">{point.action}</p>
            </div>
        </div>
    );
};
