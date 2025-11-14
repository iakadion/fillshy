import React from 'react';

export const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const renderLine = (line: string, index: number) => {
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 border-b border-purple-900 pb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('- ')) {
            return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
            return null; // Don't render empty lines as paragraphs
        }
        return <p key={index} className="my-4">{line}</p>;
    };

    const lines = content.split('\n');
    const elements = lines.map(renderLine).filter(Boolean); // Filter out nulls from empty lines

    // Group list items
    const groupedElements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];

    elements.forEach((element, index) => {
        if (React.isValidElement(element) && element.type === 'li') {
            currentList.push(element);
        } else {
            if (currentList.length > 0) {
                groupedElements.push(<ul key={`ul-${index}`} className="my-4 space-y-2">{currentList}</ul>);
                currentList = [];
            }
            groupedElements.push(element);
        }
    });

    if (currentList.length > 0) {
        groupedElements.push(<ul key="ul-last" className="my-4 space-y-2">{currentList}</ul>);
    }

    return <>{groupedElements}</>;
};
