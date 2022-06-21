import { useEffect, useState } from 'react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';

const TIMEOUT = 300;

const CustomDialog: Component = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const [isOpen, setIsOpen] = useState<boolean>(dialog.type === dialogTypes.custom);

  useEffect(() => {
    if (!isOpen) setIsOpen(dialog.type === dialogTypes.custom);
  }, [dialog.type]);

  const handleClose = (result: any) => {
    dialog.resolve(result);
    setIsOpen(false);

    setTimeout(() => setDialog({ type: null, content: null, resolve: null }), TIMEOUT);
  };

  if (!dialog.content) return null;

  return (
    <dialog.content.component
      isOpen={isOpen}
      close={handleClose}
      {...dialog.content.props}
    />
  );
};

export default CustomDialog;
