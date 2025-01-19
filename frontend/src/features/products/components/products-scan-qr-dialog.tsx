import QrReader from 'react-qr-reader'
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
        <div className='mt-4 flex justify-center items-center'>
          <QrReader
            delay={false}
            facingMode='environment'
            resolution={1080}
            style={{ width: '300px' }}
            onScan={handleScan}
          />
        </div>
        <DialogFooter className='gap-2 sm:gap-0'>
          <DialogClose asChild>
            <Button variant='outline'>Закрыть</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
