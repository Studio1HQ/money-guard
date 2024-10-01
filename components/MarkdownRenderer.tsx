import React from "react";
import ReactMarkdown from "react-markdown";

type MarkdownRendererProps = {
  content: string;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-2xl font-bold my-2" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-xl font-bold my-2" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-lg font-semibold my-2" {...props} />
          ),
          p: ({ ...props }) => <p className="my-2" {...props} />,
          ul: ({ ...props }) => (
            <ul className="list-disc pl-6 my-2" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal pl-6 my-2" {...props} />
          ),
          li: ({ ...props }) => <li className="my-1" {...props} />,
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full table-auto border-collapse"
                {...props}
              />
            </div>
          ),
          thead: ({ ...props }) => <thead className="bg-gray-50" {...props} />,
          th: ({ ...props }) => (
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td className="px-6 py-4 whitespace-nowrap" {...props} />
          ),
          tr: ({ ...props }) => <tr className="border-b" {...props} />,
          strong: ({ ...props }) => <strong className="font-bold" {...props} />,
          em: ({ ...props }) => <em className="italic" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-gray-200 pl-4 my-4 italic"
              {...props}
            />
          ),
          code: ({ ...props }) => (
            <code
              className="block bg-gray-100 p-4 rounded my-4 overflow-x-auto"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
