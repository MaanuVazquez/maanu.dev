import type { ComponentPropsWithoutRef } from 'react'
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import type { Element } from 'react-markdown/lib/rehype-filter'

import Header from './components/Header/Header'
import SyntaxHighlighter from './components/SyntaxHighlighter/SyntaxHighlighter'

export function getCodeBlock(node: Element) {
  return node.children.find((child: any) => {
    const childElement: Element = child
    return (
      childElement?.tagName === 'code' && Boolean(getLanguageFromClass(childElement?.properties?.className as string[]))
    )
  }) as Element | undefined
}

export function getLanguageFromClass(className: string[]) {
  return className?.find(c => c.includes('language-'))?.replace('language-', '')
}

export const markownComponents = {
  pre: ({ node, ...rest }: ComponentPropsWithoutRef<'pre'> & ReactMarkdownProps) => {
    const codeBlock = getCodeBlock(node)

    if (!codeBlock) {
      return <pre {...rest} />
    }

    const language = getLanguageFromClass(codeBlock?.properties?.className as string[])
    const hasMeta = Boolean(node?.data?.meta)

    return (
      <SyntaxHighlighter {...rest} language={language || ''} hasMeta={hasMeta}>
        {(codeBlock.children[0] as unknown as { type: 'text'; value: string })?.value}
      </SyntaxHighlighter>
    )
  },
  a: ({ node, ...rest }: ComponentPropsWithoutRef<'a'> & ReactMarkdownProps) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...rest} target="_blank" rel="noopener noreferrer" />
  },
  h1: ({ node, ...rest }: ComponentPropsWithoutRef<'h1'> & ReactMarkdownProps) => {
    return <Header {...rest} headerComponent="h1" />
  },
  h2: ({ node, ...rest }: ComponentPropsWithoutRef<'h2'> & ReactMarkdownProps) => {
    return <Header {...rest} headerComponent="h2" />
  },
  h3: ({ node, ...rest }: ComponentPropsWithoutRef<'h3'> & ReactMarkdownProps) => {
    return <Header {...rest} headerComponent="h3" />
  },
  h4: ({ node, ...rest }: ComponentPropsWithoutRef<'h4'> & ReactMarkdownProps) => {
    return <Header {...rest} headerComponent="h4" />
  },
  h5: ({ node, ...rest }: ComponentPropsWithoutRef<'h5'> & ReactMarkdownProps) => {
    return <Header {...rest} headerComponent="h5" />
  },
  h6: ({ node, ...rest }: ComponentPropsWithoutRef<'h6'> & ReactMarkdownProps) => {
    return <Header {...rest} headerComponent="h6" />
  }
}