import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { Dispatch } from 'react';

export type Callback = (...args: any[]) => void;

export type ModalAction =
  | {
      type: 'open';
      payload: {
        content: React.FC;
        title: string;
        saveTitle?: string;
      };
      onCreateOrSave: Callback;
    }
  | {
      type: 'close';
    }
  | {
      type: 'clear';
    }
  | {
      type: 'open_confirm';
      payload: {
        content: React.FC;
        title?: string;
        confirmTitle?: string;
      };
      onConfirm: Callback;
    };

export interface ModalContextValue {
  dispatch: Dispatch<ModalAction>;
  open: boolean;
  content: React.FC | null;
  title?: string;
  confirmTitle?: string;
  saveTitle?: string;
  onConfirm: Callback | null;
  onCreateOrSave: Callback | null;
  submitLoading: boolean;
}

export interface LayoutContextValue {
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getNestedLayout?: (page: React.ReactElement) => React.ReactNode;
  MainLayout?: React.FC<{ children: React.ReactNode }>;
};
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface BaseInfo {
  id: number;
  name: string;
  code: null;
  active: boolean;
}
export interface Owner extends BaseInfo {}
