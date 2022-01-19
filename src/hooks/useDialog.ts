import { useLayoutContext } from '@context/layout';
import { dialogTypes } from '@lib/constants';

type result = {
  alert: (text: string) => Promise<void>;
  confirm: (text: string) => Promise<boolean>;
  prompt: (text: string) => Promise<string>;
};

const useDialog = (): result => {
  const {
    dialogState: [dialog, setDialog],
  } = useLayoutContext();

  const generateDialog = <T>(text: string, type): Promise<T> =>
    new Promise((resolve) => setDialog({ type, text, resolve }));

  return {
    alert: (text) => generateDialog<void>(text, dialogTypes.alert),
    confirm: (text) => generateDialog<boolean>(text, dialogTypes.confirm),
    prompt: (text) => generateDialog<string>(text, dialogTypes.prompt),
  };
};

export default useDialog;
