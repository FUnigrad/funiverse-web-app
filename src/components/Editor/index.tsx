import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ReactQuillProps } from 'react-quill';
import { editorConfig, editorUtils } from './editorConfig';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface EditorProps extends ReactQuillProps {
  autoFocus?: boolean;
  disableNewLineByEnter?: boolean;
}
function Editor({
  onChange,
  autoFocus = false,
  disableNewLineByEnter = false,
  ...props
}: EditorProps) {
  useEffect(() => {
    // Do a trick to wait for editor mount to DOM
    setTimeout(() => {
      editorUtils.changeLinkPlaceholder();
      if (autoFocus) editorUtils.focus();
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
      theme="snow"
      modules={modules}
      formats={editorConfig.formats}
      className="quill-editor"
      bounds=".quill-editor"
      onChange={onChange}
      {...props}
    />
  );
}

export default Editor;
