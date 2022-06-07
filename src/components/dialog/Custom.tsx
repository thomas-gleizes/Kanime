import { useEffect, useMemo, useState } from 'react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';
import Modal from 'components/layouts/Modal';

const CustomDialog: Component = () => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const [content, setContent] = useState<JSX.Element>();

  const isOpen = useMemo<boolean>(
    () => dialog.type === dialogTypes.custom,
    [dialog.type]
  );

  const handleClose = (result: any) => {
    dialog.resolve(result);

    setTimeout(() => setDialog({ type: null, content: null, resolve: null }), 300);
  };

  useEffect(() => {
    if (isOpen)
      setContent(
        <dialog.content.component close={handleClose} {...dialog.content.props} />
      );
    else setTimeout(() => setContent(null), 300);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={() => handleClose(null)}>
      {content}
    </Modal>
  );
};

export default CustomDialog;
