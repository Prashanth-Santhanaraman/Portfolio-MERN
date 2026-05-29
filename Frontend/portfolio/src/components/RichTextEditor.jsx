import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Write something...',
    height: 400,
    statusbar: false,
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'superscript', 'subscript', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'paragraph', '|',
      'image', 'video', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'fullsize'
    ],
  }), [placeholder]);

  return (
    <div className="bg-white text-black rounded-md overflow-hidden mb-12">
      <JoditEditor
        ref={editor}
        value={value || ''}
        config={config}
        tabIndex={1} 
        onBlur={newContent => onChange(newContent)}
        onChange={newContent => onChange(newContent)}
      />
    </div>
  );
}
