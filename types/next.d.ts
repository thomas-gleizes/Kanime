declare module 'next/app' {
  import type {
    GetServerSideProps,
    GetStaticPaths,
    GetStaticProps,
    NextPage,
  } from 'next';

  declare type Page<P = {}> = NextPage<P> & {
    layout?: Component<{ children: NodeR } & P>;
  };

  declare type ServerSideProps<T> = GetServerSideProps<T>;
  declare type StaticProps<T> = GetStaticProps<T>;
  declare type StaticPaths<T> = GetStaticPaths<T>;

  interface AppProps {
    pageProps: any;
    Component: Page;
  }
}
