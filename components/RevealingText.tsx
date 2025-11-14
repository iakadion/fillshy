import React from 'react';

interface RevealingTextProps {
    text: string;
    className?: string;
    as?: 'p' | 'h1' | 'h2' | 'h3';
    staggerDelay?: number;
}

const RevealingText: React.FC<RevealingTextProps> = ({ text, className, as: Component = 'p', staggerDelay = 50 }) => {
    // A simple check to prevent crashing on null/undefined text
    if (!text) {
        return <Component className={className}></Component>;
    }

    return (
        <Component className={className}>
            {text.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="reveal-word" style={{ animationDelay: `${wordIndex * staggerDelay}ms` }}>
                    {word}{' '}
                </span>
            ))}
        </Component>
    );
};

export default RevealingText;
