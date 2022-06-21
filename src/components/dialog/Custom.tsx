import { useEffect, useMemo, useState } from 'react';

import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';

const TIMEOUT = 300;

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

    setTimeout(() => setDialog({ type: null, content: null, resolve: null }), TIMEOUT);
  };

  useEffect(() => {
    if (isOpen)
      setContent(
        <dialog.content.component
          isOpen={isOpen}
          close={handleClose}
          {...dialog.content.props}
        />
      );
    else setTimeout(() => setContent(undefined), TIMEOUT);
  }, [isOpen, dialog]);

  return content;
};

export default CustomDialog;
