'use client'

import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { cn } from '@/utils'

type CameraProps = {
  src: string
  className?: string
}

export const Camera = ({ src, className }: CameraProps) => {
  const videoRef = useRef(null) as any

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(videoRef.current)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play()
      })
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play()
      })
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      className={cn('rounded-3xl', className)}
    >
      Seu navegador não suporta o elemento de vídeo.
    </video>
  )
}
