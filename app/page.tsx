"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function ARDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraPermission, setCameraPermission] = useState<"pending" | "granted" | "denied">("pending")
  const [isDetecting, setIsDetecting] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup: stop camera when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setCameraPermission("granted")
        setIsDetecting(true)
        startDetection()
      }
    } catch (error) {
      console.error("[v0] Camera access error:", error)
      setCameraPermission("denied")
    }
  }

  const startDetection = () => {
    // For demo purposes, we'll show the overlay after 3 seconds
    setTimeout(() => {
      setShowOverlay(true)
    }, 3000)
  }

  if (cameraPermission === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="rounded-lg bg-white/10 p-8 text-center backdrop-blur-sm">
          <h1 className="mb-4 text-2xl font-bold text-white">Permiso de cámara denegado</h1>
          <p className="mb-6 text-slate-300">
            Por favor, permite el acceso a la cámara para usar la realidad aumentada.
          </p>
          <Button onClick={() => window.location.reload()} variant="secondary">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  if (cameraPermission === "pending") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="rounded-lg bg-white/10 p-8 text-center backdrop-blur-sm">
          <h1 className="mb-6 text-3xl font-bold text-white">Demo AR - iPhone 17</h1>
          <p className="mb-8 text-slate-300">
            Apunta la cámara a la imagen del iPhone en su caja para ver el modelo 3D
          </p>
          <Button onClick={startCamera} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Iniciar Cámara
          </Button>
        </div>

        <div className="max-w-md rounded-lg bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="mb-3 font-semibold text-white">Instrucciones:</h2>
          <ol className="space-y-2 text-sm text-slate-300">
            <li>1. Haz clic en "Iniciar Cámara" y permite el acceso</li>
            <li>2. Apunta la cámara hacia la imagen del iPhone en su caja</li>
            <li>3. Mantén la imagen visible y espera la detección</li>
            <li>4. Verás aparecer el modelo del iPhone sobre la imagen</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Camera feed */}
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 h-full w-full object-cover" />

      {/* Canvas for AR overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* AR Overlay - iPhone image */}
      {showOverlay && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-500">
          <img
            src="/models/iphone-overlay.webp"
            alt="iPhone 17 Pro Max"
            className="h-auto w-64 drop-shadow-2xl md:w-96"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      )}

      {/* UI Overlay */}
      <div className="absolute left-4 top-4 z-10 rounded-lg bg-black/70 p-4 text-white backdrop-blur-sm">
        <h2 className="mb-1 text-lg font-bold">Demo AR - iPhone 17</h2>
        <p className="text-sm text-slate-300">
          {isDetecting && !showOverlay && "Buscando imagen..."}
          {showOverlay && "¡Imagen detectada!"}
        </p>
      </div>

      {/* Detection indicator */}
      {isDetecting && !showOverlay && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
            <span className="text-sm font-medium">Apunta a la imagen del iPhone en su caja</span>
          </div>
        </div>
      )}

      {/* Reset button */}
      {showOverlay && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button onClick={() => setShowOverlay(false)} variant="secondary" className="shadow-lg">
            Detectar de nuevo
          </Button>
        </div>
      )}
    </div>
  )
}
