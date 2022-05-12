declare type Component<P = {}> = React.FC<P>;

declare type State<S = any> = [S, React.Dispatch<React.SetStateAction<S>>];

declare type NodeR = React.ReactNode | string;

declare type OptionalPromise<T> = T | Promise<T>;

interface ContextProviderProps {
  children: React.ReactNode;
}

type ErrorPage = {
  statusCode: number;
  message: string;
};

type modelParams = {
  limit?: number | string | string[];
  skip?: number | string | string[];
  includes?: string | string[];
};

declare type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type InputType =
  | 'text'
  | 'email'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

declare type TailwindcssGradiant =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

declare type TailwindcssColors =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';
