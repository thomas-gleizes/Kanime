import { v4 as uuid } from 'uuid';

import { useDialogContext } from 'context/dialog.context';

type useDialogResult = <Props, Result>(
  component: DialogComponent<Props, Result>,
  props: Props
) => Promise<Result>;

export default function useDialog(options?: DialogOptions): useDialogResult {
  const { addDialog } = useDialogContext();

  return (component, props) =>
    new Promise((resolve) =>
      addDialog({ uid: uuid(), props, Component: component, resolve, options })
    );
}
