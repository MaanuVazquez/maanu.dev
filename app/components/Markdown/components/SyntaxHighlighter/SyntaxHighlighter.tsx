import { memo, useCallback, useRef, useState } from 'react'
import { PrismLight } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import { oneDark as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { ClientOnly } from 'remix-utils'

import type { ReactNode } from 'react'

import CopyCode from '../CopyCode/CopyCode'

type Props = {
  children: ReactNode | ReactNode[]
  language: string
  hasMeta: boolean
}

PrismLight.registerLanguage('tsx', tsx)
PrismLight.registerLanguage('typescript', typescript)
PrismLight.registerLanguage('scss', scss)
PrismLight.registerLanguage('bash', bash)
PrismLight.registerLanguage('markdown', markdown)
PrismLight.registerLanguage('json', json)

function SyntaxHighlighter({ children, language, hasMeta }: Props) {
  const text = useRef(children as string)
  const [showCopyButton, setShowCopyButton] = useState(false)

  const showCopyToggle = useCallback(() => {
    setShowCopyButton(true)
  }, [])

  const hideCopyToggle = useCallback(() => {
    setShowCopyButton(false)
  }, [])

  return (
    <ClientOnly
      fallback={
        <pre>
          <code>{children}</code>
        </pre>
      }
    >
      {() => (
        <div onMouseEnter={showCopyToggle} onMouseLeave={hideCopyToggle} className="relative">
          <CopyCode show={showCopyButton} text={text.current} />
          <PrismLight
            style={style}
            language={language}
            PreTag="pre"
            className="codeStyle h-full w-full"
            showLineNumbers
            wrapLines={hasMeta}
            useInlineStyles
          >
            {text.current}
          </PrismLight>
        </div>
      )}
    </ClientOnly>
  )
}

export default memo(SyntaxHighlighter)
