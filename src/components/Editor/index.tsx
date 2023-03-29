import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { ReactQuillProps } from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// const ForwardedRefReactQuill = React.forwardRef<any, any>((props, ref) => (
//   <ReactQuill {...props} ref={ref} />
// ));

// ForwardedRefReactQuill.displayName = 'ReactQuill';

const atValues = [
  { id: 1, value: 'Fredrik Sundqvist' },
  { id: 2, value: 'Patrik Sjölin' },
];
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    // ['clean'],
  ],
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@', '#'],
    source: function (searchTerm: any, renderItem: any, mentionChar: any) {
      let values: any;
      if (mentionChar === '@' || mentionChar === '#') {
        values = atValues;
      }
      if (searchTerm.length === 0) {
        renderItem(values, searchTerm);
      } else {
        const matches = [];
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i]);
        renderItem(matches, searchTerm);
      }
    },
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'mention',
];

function Editor({ onChange }: { onChange: ReactQuillProps['onChange'] }) {
  // const [text, setText] = useState("<div contenteditable='false'>Hector oscar Pacheco</div>");

  // const handleProcedureContentChange = (content, delta, source, editor) => {
  //   let has_attribues = delta.ops[1].attributes || "";
  //   console.log(has_attribues);
  //   const cursorPosition = e.quill.getSelection().index;
  //   this.quill.insertText(cursorPosition, "★");
  //   this.quill.setSelection(cursorPosition + 1);
  //   setText(content);
  // };

  const editorRef = useRef<any>(null);
  useEffect(() => {
    const input = document.querySelector('input[data-link]') as HTMLInputElement;
    const placeholder = 'Paste or type a link ...';
    if (input) {
      input.dataset.link = placeholder;
      input.placeholder = placeholder;
    }
    console.log(editorRef.current);

    // const quillEditor = editorRef.current?.getEditor();
    // quillEditor?.focus();
  }, []);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      className="quill-editor"
      bounds=".quill-editor"
      // value={text}
      onChange={onChange}
    />
  );
}

export default Editor;
