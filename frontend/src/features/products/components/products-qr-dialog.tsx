import { useState, useEffect, useRef } from 'react'
import { Download } from 'lucide-react'
import QRCode from 'react-qr-code'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Product } from '../data/schema'
import { compressProduct } from '../lib/compression'

// Props Interface
interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Product
}

export function ProductsViewQRDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const [qrValue, setQrValue] = useState<string>('')
  const svgRef = useRef(null)

  useEffect(() => {
    if (currentRow) {
      const { id, ...productWithoutId } = currentRow
      const compressedData = compressProduct(productWithoutId)
      setQrValue(compressedData)
    }
  }, [currentRow])

  const handleDownload = () => {
    const svgElement = svgRef.current

    if (!svgElement) return

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)

    const canvas = document.createElement('canvas')
    const svgSize = 256
    canvas.width = svgSize
    canvas.height = svgSize
    const ctx = canvas.getContext('2d')

    const img = new Image()
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx?.drawImage(img, 0, 0, svgSize, svgSize)
      URL.revokeObjectURL(url)

      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = `${currentRow.id}.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }

    img.src = url
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto max-w-full sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>QR код: {currentRow?.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className='flex justify-center items-center h-full'>
          {qrValue && (
            <div style={{ background: 'white', padding: '16px' }}>
              <QRCode
                value={qrValue}
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                viewBox={`0 0 256 256`}
                ref={svgRef}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Закрыть</Button>
          </DialogClose>
          <Button onClick={handleDownload}>
            <Download />
            Скачать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
