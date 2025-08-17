
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );
};
