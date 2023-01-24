import { FC, ReactNode, ReactElement } from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { MockedProvider, MockedProviderProps } from '@apollo/client/testing';

type DefaultParams = Parameters<typeof render>;
type WrapperProps = {
  wrapperProps: {
    router?: Partial<NextRouter>;
    mocks?: MockedProviderProps['mocks'];
    addTypename?: boolean;
    children?: ReactNode;
  };
};
type RenderOptions = DefaultParams[1] & WrapperProps;

const mockRouter: Partial<NextRouter> = {
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  isFallback: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
};

export const setupTests = (): void => {
  window.HTMLMediaElement.prototype.load = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.play = () => {
    /* do nothing */
    return new Promise((resolve) => resolve());
  };
  window.HTMLMediaElement.prototype.pause = () => {
    /* do nothing */
  };
  Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
    set: jest.fn(),
  });
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
  window.URL.createObjectURL = jest
    .fn()
    .mockImplementation((val) => (val ? ' url' : undefined));

  const storageMock = () => {
    const storage = {};

    return {
      setItem: function (key: string, value: string) {
        storage[key] = value || '';
      },
      getItem: function (key: string) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function (key: string) {
        delete storage[key];
      },
      clear: function () {
        Object.keys(storage).forEach((key) => {
          delete storage[key];
        });
      },
      get length() {
        return Object.keys(storage).length;
      },
    };
  };

  Object.defineProperty(window, 'localStorage', {
    value: storageMock(),
  });
};

setupTests();

const AllTheProviders: FC<WrapperProps['wrapperProps']> = ({
  children,
  router,
  mocks = [],
  addTypename = false,
}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      <RouterContext.Provider
        value={{ ...mockRouter, ...(router as NextRouter) }}
      >
        {children}
      </RouterContext.Provider>
    </MockedProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult =>
  render(ui, {
    wrapper: function renderWrapper(props) {
      return <AllTheProviders {...props} {...options?.wrapperProps} />;
    },
    ...options,
  });

export const wait = async (ms = 0): Promise<void> => {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
};

export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
