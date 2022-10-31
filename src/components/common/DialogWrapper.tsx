import { useState } from 'react'

import { useDialogContext } from 'context/dialog.context'

const DEFAULT_TIMEOUT = 300

const DialogContainer: Component<Dialog> = ({
  uid,
  component: Component,
  props,
  resolve,
  options
}) => {
  const { closeDialog } = useDialogContext()

  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleClose = (result: any) => {
    resolve(result)
    setIsOpen(false)

    window.setTimeout(() => closeDialog(uid), options?.timeout || DEFAULT_TIMEOUT)
  }

  return <Component isOpen={isOpen} close={handleClose} {...props} />
}

const DialogWrapper: Component = () => {
  const { dialogs } = useDialogContext()

  return (
    <>
      {dialogs.map((dialog, index) => (
        <DialogContainer key={index} {...dialog} />
      ))}
    </>
  )
}

export default DialogWrapper
