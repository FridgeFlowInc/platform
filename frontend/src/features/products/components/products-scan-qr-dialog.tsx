import { QrReader } from 'react-qr-reader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScanQRDialog({ open, onOpenChange }: Props) {
  const handleScan = (result: string) => {
    if (result) {
      console.log(result)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm gap-2'>
        <DialogHeader className='text-left'>
          <DialogTitle>Сканирование QR</DialogTitle>
          <DialogDescription>Наведите камеру на qr-код.</DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          <QrReader
            onResult={(result) => {
              if (result) {
                handleScan(result.getText())
              }
            }}
            constraints={{ facingMode: 'environment' }}
            className='w-full'
          />
        </div>
        <DialogFooter className='gap-2 sm:gap-0'>
          <Button onClick={() => onOpenChange(false)} variant='outline'>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
