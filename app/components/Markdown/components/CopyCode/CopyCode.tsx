import { Check, Copy } from '@phosphor-icons/react'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

type Props = {
  show: boolean
  text: string
}

function CopyCode({ show, text }: Props) {
  const [didCopy, setDidCopy] = useState(false)
  const currentTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (!currentTimeout.current) {
        return
      }
      clearTimeout(currentTimeout.current)
    }
  }, [])

  const onCopy = useCallback(() => {
    setDidCopy(true)
    currentTimeout.current = setTimeout(() => {
      setDidCopy(false)
    }, 2000)
  }, [])

  return (
    <CopyToClipboard text={text} onCopy={onCopy}>
      <button
        className={classNames(
          'absolute',
          'right-4',
          'top-4',
          { invisible: !show },
          { btn: show, 'btn-success': didCopy }
        )}
      >
        {didCopy ? (
          <>
            <Check aria-hidden />
            <span className="sr-only">Copied!</span>
          </>
        ) : (
          <>
            <Copy aria-hidden />
            <span className="sr-only">Copy</span>
          </>
        )}
      </button>
    </CopyToClipboard>
  )
}

export default memo(CopyCode)
