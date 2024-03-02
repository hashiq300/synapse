import React from 'react'
import Markdown from 'react-markdown';

type PreviewBodyProps = {
    note: string;
}

const PreviewBody = ({ note }: PreviewBodyProps) => {
    return (
        <div className='mt-12'>
            <Markdown className="prose prose-slate prose-lg">{note}</Markdown>
        </div>
    )
}

export default PreviewBody
