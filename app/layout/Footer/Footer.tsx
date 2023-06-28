import { Heart } from '@phosphor-icons/react'

export function Footer() {
  return (
    <footer className='mx-auto flex gap-x-2 pb-10 sm:pb-20'>
      Made with <Heart className='self-center text-error motion-safe:animate-bounce' /> by Maanu
    </footer>
  )
}
