import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getSession } from 'services/session.service';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    const session = await getSession(ctx.req, ctx.res);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => {
          App.defaultProps = { ...App.defaultProps, session };
          return App;
        },
        enhanceComponent: (Component) => Component
      });


    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="fr">
        <Head />
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
