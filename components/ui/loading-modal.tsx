"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

interface LoadingModalProps {
  open: boolean
  message?: string
}

export function LoadingModal({ 
  open, 
  message = "Aguarda mientras se guardan las respuestas" 
}: LoadingModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogTitle className="sr-only">Guardando respuestas</DialogTitle>
        <DialogDescription className="sr-only">Por favor espere mientras se procesan y guardan las respuestas del formulario</DialogDescription>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <Spinner className="size-8 mb-4" />
          <p className="text-lg font-medium">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}