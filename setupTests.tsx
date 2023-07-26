import { type ReactElement } from 'react'; // TypeScript only
import { JSDOM } from 'jsdom';
import { render as originalRender } from '@testing-library/react';

// This is only needed for TypeScript

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
    }
  }
}

const setDom = () => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    /* options */
  });

  // `as` and anything after it are TypeScript-specific
  global.window = dom.window as unknown as Window & typeof globalThis;
  global.document = dom.window.document;
};

// Or just `(ui) => {` if you aren't using TypeScript
export const render = (ui: ReactElement) => {
  setDom();
  return originalRender(ui);
};
