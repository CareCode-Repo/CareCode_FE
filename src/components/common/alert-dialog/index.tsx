import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { Children, ReactElement, ReactNode } from 'react'

interface DialogProps {
  isOpen: boolean
  title: string
  description: string
  cancelButton?: ReactNode
  confirmButton?: ReactNode
  onClose: () => void
}

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  description,
  cancelButton,
  confirmButton,
}: DialogProps): ReactElement => {
  return (
    <RadixAlertDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-black/65 z-10" />
        <RadixAlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4.5 pt-6 pb-4.5 rounded-xl w-[331px] z-20 border border-gray-300">
          <RadixAlertDialog.Title className="text-t1-semibold text-center text-gray-800 mb-2">
            {title}
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="text-b1-regular text-gray-600 text-center mb-5">
            {description}
          </RadixAlertDialog.Description>
          <div className="flex justify-end gap-2">
            {cancelButton}
            {confirmButton}
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}

export default AlertDialog
