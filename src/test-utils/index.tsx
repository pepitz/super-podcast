import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import { Provider } from "react-redux";

import { store, type AppStore, type RootState } from "../app/store";
// As a basic setup, import your same slice reducers
import podcastReducer from "@store/features/podcasts/podcastsSlice";
import episodesReducer from "@store/features/episodes/episodesSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions
  extends Omit<RenderOptions, "queries" | "wrapper"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}
type ProvidersProps = {
  children: React.ReactNode;
};

const AllTheProviders = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
