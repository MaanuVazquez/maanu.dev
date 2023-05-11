import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { markownComponents } from './utils'

type Props = {
  children: string
}

export default function Markdown(props: Props) {
  return (
    <ReactMarkdown components={markownComponents} remarkPlugins={[remarkGfm]}>
      {props.children}
    </ReactMarkdown>
  )
}
