import React from 'react';

interface MarkdownRendererProps {
    markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
    if (!markdown) return null;

    const renderLine = (line: string, index: number) => {
        // Handle bold text using regex
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <p key={index} className="mb-2">
                {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                })}
            </p>
        );
    };

    const lines = markdown.split('\n');
    // Fix: Use React.ReactElement instead of JSX.Element to resolve namespace error.
    const elements: React.ReactElement[] = [];
    let listItems: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`list-${elements.length}`} className="list-disc pl-5 my-4 space-y-1">
                    {listItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.trim().startsWith('- ')) {
            listItems.push(line.trim().substring(2));
        } else {
            flushList();
            if (line.trim() !== '') {
                elements.push(renderLine(line, index));
            }
        }
    });

    flushList(); // Make sure to render any remaining list items at the end

    return <div>{elements}</div>;
};

export default MarkdownRenderer;