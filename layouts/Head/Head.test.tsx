import { ReactElement } from 'react';
import { wait, render } from 'test-utils';
// Components
import Head from './Head';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('layouts/Head/Head', () => {
  it('should render basic elements', async () => {
    const title = 'Some random title';
    const description = 'Some random description';

    render(<Head title={title} description={description} />);
    await wait();

    expect(document.querySelector('title')).toBeInTheDocument();
    expect(document.querySelector('title')).toContainHTML(
      `<title>${title}</title>`
    );

    expect(
      document.querySelector('meta[name="description"]')
    ).toBeInTheDocument();
    expect(document.querySelector('meta[name="description"]')).toContainHTML(
      `<meta name="description" content="${description}" />`
    );

    expect(document.querySelector('meta[name="viewport"]')).toBeInTheDocument();
    expect(document.querySelector('meta[name="viewport"]')).toContainHTML(
      '<meta name="viewport" content="width=device-width, initial-scale=1" />'
    );

    expect(document.querySelector('link')).toBeInTheDocument();
    expect(document.querySelector('link')).toContainHTML(
      '<link rel="icon" href="/favicon.ico" />'
    );
  });
});
