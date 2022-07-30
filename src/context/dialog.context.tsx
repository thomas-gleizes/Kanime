import React, { createContext, useState } from 'react';
import { useContextFactory } from 'hooks';
import DialogWrapper from 'components/common/DialogWrapper';

type DialogContextValues = {
  dialogs: Dialog[];
  addDialog: (dialog: Dialog) => void;
  closeDialog: Function;
};

const DialogContext = createContext<DialogContextValues>({} as any);
// eslint-disable-next-line react-hooks/rules-of-hooks
export const useDialogContext = useContextFactory<DialogContextValues>(DialogContext);

const DialogContextProvider: Component<{ children: ReactNode }> = ({ children }) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const addDialog = (dialog: Dialog) => setDialogs([...dialogs, dialog]);

  const closeDialog = (uid: string) => {
    const index = dialogs.findIndex((d) => d.uid === uid);
    setDialogs([...dialogs.slice(0, index), ...dialogs.slice(index + 1)]);
  };

  return (
    <DialogContext.Provider value={{ dialogs, closeDialog, addDialog }}>
      {children}
      <DialogWrapper />
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
