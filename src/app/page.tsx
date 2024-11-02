import { Camera } from '@/modules/stream/components'
import { Text } from '@developerskyi/react-components'

export default async function Home() {
  const response = await fetch(
    `${process.env.URL_API}/hls/02-11-2024?file=cam1`
  )

  const data = await response.json()

  if (!response.ok) {
    return (
      <section className="flex flex-col gap-16 text-neutral-light">
        <Text tag="p" variant="2xl/normal">
          Server offline
        </Text>
      </section>
    )
  }
  return (
    <>
      <section className="flex flex-col gap-4 text-neutral-light">
        <Text tag="h1" variant="3xl/bold">
          Sistema de segurança web
        </Text>

        <div className="flex flex-wrap gap-4 text-neutral-light">
          {data.isActive ? (
            <>
              {Array.from({ length: 1 }).map((_, index) => (
                <Camera key={index} src={data.path} className="w-1/4" />
              ))}
            </>
          ) : (
            <Text tag="p" variant="2xl/normal">
              No camera available
            </Text>
          )}
        </div>
      </section>
    </>
  )
}
