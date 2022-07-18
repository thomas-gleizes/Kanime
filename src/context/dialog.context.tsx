import React, { createContext, useState } from 'react';
import { useContextFactory } from 'hooks';
import {
  AlertDialog,
  ConfirmDialog,
  CustomDialog,
  PromptDialog,
} from 'components/dialog';

type Dialog<Params = any, Content = any> = {
  type: string;
  content: Content;
  resolve: (params: Params) => void;
};

type DialogContextType = {
  dialogs: Dialog[];
  resetDialogs: Function;
  addDialog: (dialog: Dialog) => void;
};

const DialogContext = createContext<DialogContextType>({} as any);
export const useDialogContext = useContextFactory<DialogContextType>(DialogContext);

const DialogContextProvider: Component<{ children: NodeR }> = ({ children }) => {
  const [dialogs, setDialogs] = useState<Dialog[]>([]);

  const addDialog = (dialog: Dialog) => setDialogs([...dialogs, dialog]);

  const resetDialogs = () => {
    setDialogs([]);
  };

  return (
    <DialogContext.Provider value={{ dialogs, resetDialogs, addDialog }}>
      {children}
      {dialogs.length > 0 && (
        <>
          <ConfirmDialog />
          <PromptDialog />
          <AlertDialog />
          <CustomDialog />
        </>
      )}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
