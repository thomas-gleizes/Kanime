import { useLayoutContext } from 'context/layout.context';
import { dialogTypes } from 'resources/constants';

type result = {
  alert: (message: string) => Promise<void>;
  confirm: (message: string) => Promise<boolean>;
  prompt: (message: string) => Promise<string | false>;
  custom: <Result = any, Props = any>(
    component: Component<Props>,
    props?: Props
  ) => Promise<Result>;
};

export default function useDialog(): result {
  const {
    dialogState: { 1: setDialog },
  } = useLayoutContext();

  const generateDialog = <Params, Content = string>(
    content: Content,
    type: keyof typeof dialogTypes
  ): Promise<Params> => new Promise((resolve) => setDialog({ type, content, resolve }));

  return {
    alert: (message) => generateDialog<void>(message, dialogTypes.alert),
    confirm: (message) => generateDialog<boolean>(message, dialogTypes.confirm),
    prompt: (message) => generateDialog<string | false>(message, dialogTypes.prompt),
    custom: (component, props) =>
      generateDialog({ component, props }, dialogTypes.custom),
  };
}

type Test = keyof typeof dialogTypes;
