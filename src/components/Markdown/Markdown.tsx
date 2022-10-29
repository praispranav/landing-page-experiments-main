/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/display-name */
import { SerializedStyles } from '@emotion/core';
import { Component, FC } from 'react';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

export enum OpenTags {
    Paragraph = 'p',
    Strong = 'strong',
    Em = 'em',
    Ul = 'ul',
    Ol = 'ol',
    Li = 'li',
    Anchor = 'a',
    Blockquote = 'blockquote',
    Hr = 'hr',
}

export enum ReservedTags {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
    Code = 'code',
    Img = 'img',
}
interface IMarkdownProps {
    markdown: string;
    tag?: ReservedTags | OpenTags;
    style?: SerializedStyles;
    testId?: string;
}

export const Markdown: FC<IMarkdownProps> = ({
    markdown,
    tag = OpenTags.Paragraph,
    testId = 'MARKDOWN_ELEMENT',
    style,
}) => (
    <ReactMarkdown
        components={{
            p: ({ children }) => {
                const Tag = (tag as unknown) as typeof Component;
                return (
                    <Tag css={style} data-testid={testId}>
                        {children}
                    </Tag>
                );
            },
        }}
        disallowedElements={[...Object.values(ReservedTags)]}
        linkTarget="_self"
    >
        {markdown}
    </ReactMarkdown>
);

export const stringifyMarkdown = ({
    markdown,
    tag = OpenTags.Paragraph,
    testId = 'MARKDOWN_ELEMENT',
    style,
}: IMarkdownProps): string => renderToString(<Markdown markdown={markdown} tag={tag} testId={testId} style={style} />);
