import type { V2_MetaFunction } from '@remix-run/node'

export const meta: V2_MetaFunction = () => {
  return [{ title: "Maanu's blog" }]
}

export default function Index() {
  return (
    <div>
      <h1>!</h1>
    </div>
  )
}
