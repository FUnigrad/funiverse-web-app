import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ReactQuillProps } from 'react-quill';
import { editorConfig, editorUtils } from './editorConfig';
import BaseReactQuill from 'react-quill';
import { useComposedRefs } from 'hooks';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    // eslint-disable-next-line react/display-name
    return ({
      forwardedRef,
      ...props
    }: ReactQuillProps & { forwardedRef?: React.LegacyRef<BaseReactQuill> }) => {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  },
);

interface EditorProps extends ReactQuillProps {
  autoFocus?: boolean;
  disableNewLineByEnter?: boolean;
}
// eslint-disable-next-line react/display-name
const Editor = React.forwardRef<BaseReactQuill, EditorProps>(
  ({ onChange, autoFocus = false, disableNewLineByEnter = false, ...props }, forwardedRef) => {
    const editorRef = useRef<BaseReactQuill>(null);
    const composedRefs = useComposedRefs(editorRef, forwardedRef);
    useEffect(() => {
      // Do a trick to wait for editor mount to DOM
      setTimeout(() => {
        editorUtils.changeLinkPlaceholder();
        if (autoFocus) editorRef.current?.focus();
      }, 100);
    }, [autoFocus]);

    const modules = useMemo(() => {
      if (disableNewLineByEnter) {
        return editorConfig.modules;
      }
      const { keyboard, ...result } = editorConfig.modules;
      return result;
    }, [disableNewLineByEnter]);

    return (
      <ReactQuill
        // forwardedRef={forwardedRef}
        forwardedRef={composedRefs}
        theme="snow"
        modules={modules}
        formats={editorConfig.formats}
        className="quill-editor"
        bounds=".quill-editor"
        onChange={onChange}
        {...props}
      />
    );
  },
);

export default Editor;
