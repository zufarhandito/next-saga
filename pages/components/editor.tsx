import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

const EditorComp = ({ setDesc }: any) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    console.log(editorState)

    const onEditorStateChange = (newEditorState: any) => {
        setEditorState(newEditorState);
        setDesc(convertToRaw(editorState.getCurrentContent()))
    };

    return (
        <Editor
            editorClassName='border border-gray-300 rounded-md px-3'
            placeholder='write description here..'
            editorStyle={{ height: '359px' }}
            toolbar={{
                options: ['inline', 'textAlign', 'list']
            }}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
        />
    );
};

export default EditorComp;


// import React, { useState } from 'react'
// import { createEditor } from 'slate'
// import { Slate, Editable, withReact } from 'slate-react'
// import { BaseEditor, Descendant } from 'slate'
// import { ReactEditor } from 'slate-react'

// type CustomElement = { type: 'paragraph'; children: CustomText[] }
// type CustomText = { text: string }

// declare module 'slate' {
//     interface CustomTypes {
//         Editor: BaseEditor & ReactEditor
//         Element: CustomElement
//         Text: CustomText
//     }
// }

// const initialValue: any = [
//     {
//         type: 'paragraph',
//         children: [{ text: 'A line of text in a paragraph.' }],
//     },
// ]

// export default function EditorComp() {
//     const [editor] = useState(() => withReact(createEditor()))
//     return (
//         <Slate editor={editor} initialValue={initialValue} >
//             <Editable onKeyDown={event => {
//                 if (event.key === '&') {
//                     // Prevent the ampersand character from being inserted.
//                     event.preventDefault()
//                     // Execute the `insertText` method when the event occurs.
//                     editor.insertText('and')
//                 }
//             }} />
//         </Slate>
//     )
// }

// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import isHotkey from 'is-hotkey'
// import { Editable, withReact, useSlate, Slate } from 'slate-react'
// import { BiBold, BiCode, BiItalic, BiUnderline } from 'react-icons/bi'
// import {
//     Editor,
//     Transforms,
//     createEditor,
//     Descendant,
//     Element as SlateElement,
// } from 'slate'
// import { withHistory } from 'slate-history'

// import { Button, Icon, Toolbar } from './editorComponents'

// const HOTKEYS = {
//     'mod+b': 'bold',
//     'mod+i': 'italic',
//     'mod+u': 'underline',
//     'mod+`': 'code',
// }

// const LIST_TYPES = ['numbered-list', 'bulleted-list']
// const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

// const RichTextExample = () => {
//     const [text, setText] = useState('')
//     const renderElement = useCallback(props => <Element {...props} />, [])
//     const renderLeaf = useCallback(props => <Leaf {...props} />, [])
//     const editor = useMemo(() => withHistory(withReact(createEditor())), [])

//     console.log(text)
//     useEffect(() => { }, [text])

//     return (
//         <Slate editor={editor} initialValue={initialValue} onChange={value => {
//             const isAstChange = editor.operations.some(
//                 op => 'set_selection' !== op.type
//             )
//             if (isAstChange) {
//                 // Save the value to Local Storage.
//                 const content = JSON.stringify(value)
//                 // localStorage.setItem('content', content)
//                 setText(content)
//             }
//         }}>
//             <Toolbar>
//                 <MarkButton format="bold" icon={<BiBold />} />
//                 <MarkButton format="italic" icon={<BiItalic />} />
//                 <MarkButton format="underline" icon={<BiUnderline />} />
//                 <MarkButton format="code" icon={<BiCode />} />
//                 <BlockButton format="heading-one" icon="looks_one" />
//                 <BlockButton format="heading-two" icon="looks_two" />
//                 <BlockButton format="block-quote" icon="format_quote" />
//                 <BlockButton format="numbered-list" icon="format_list_numbered" />
//                 <BlockButton format="bulleted-list" icon="format_list_bulleted" />
//                 <BlockButton format="left" icon="format_align_left" />
//                 <BlockButton format="center" icon="format_align_center" />
//                 <BlockButton format="right" icon="format_align_right" />
//                 <BlockButton format="justify" icon="format_align_justify" />
//             </Toolbar>
//             <Editable
//                 renderElement={renderElement}
//                 renderLeaf={renderLeaf}
//                 placeholder="Enter some rich text…"
//                 spellCheck
//                 autoFocus
//                 onKeyDown={event => {
//                     for (const hotkey in HOTKEYS) {
//                         if (isHotkey(hotkey, event as any)) {
//                             event.preventDefault()
//                             const mark = HOTKEYS[hotkey]
//                             toggleMark(editor, mark)
//                         }
//                     }
//                 }}
//             />
//         </Slate>
//     )
// }

// const toggleBlock = (editor, format) => {
//     const isActive = isBlockActive(
//         editor,
//         format,
//         TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
//     )
//     const isList = LIST_TYPES.includes(format)

//     Transforms.unwrapNodes(editor, {
//         match: n =>
//             !Editor.isEditor(n) &&
//             SlateElement.isElement(n) &&
//             LIST_TYPES.includes(n.type) &&
//             !TEXT_ALIGN_TYPES.includes(format),
//         split: true,
//     })
//     let newProperties: Partial<SlateElement>
//     if (TEXT_ALIGN_TYPES.includes(format)) {
//         newProperties = {
//             align: isActive ? undefined : format,
//         }
//     } else {
//         newProperties = {
//             type: isActive ? 'paragraph' : isList ? 'list-item' : format,
//         }
//     }
//     Transforms.setNodes<SlateElement>(editor, newProperties)

//     if (!isActive && isList) {
//         const block = { type: format, children: [] }
//         Transforms.wrapNodes(editor, block)
//     }
// }

// const toggleMark = (editor, format) => {
//     const isActive = isMarkActive(editor, format)

//     if (isActive) {
//         Editor.removeMark(editor, format)
//     } else {
//         Editor.addMark(editor, format, true)
//     }
// }

// const isBlockActive = (editor: any, format: any, blockType = 'type') => {
//     const { selection } = editor
//     if (!selection) return false

//     const [match] = Array.from(
//         Editor.nodes(editor, {
//             at: Editor.unhangRange(editor, selection),
//             match: n =>
//                 !Editor.isEditor(n) &&
//                 SlateElement.isElement(n) &&
//                 n[blockType] === format,
//         })
//     )

//     return !!match
// }

// const isMarkActive = (editor, format) => {
//     const marks = Editor.marks(editor)
//     return marks ? marks[format] === true : false
// }

// const Element = ({ attributes, children, element }) => {
//     const style = { textAlign: element.align }
//     switch (element.type) {
//         case 'block-quote':
//             return (
//                 <blockquote style={style} {...attributes}>
//                     {children}
//                 </blockquote>
//             )
//         case 'bulleted-list':
//             return (
//                 <ul style={style} {...attributes}>
//                     {children}
//                 </ul>
//             )
//         case 'heading-one':
//             return (
//                 <h1 className='text-2xl' {...attributes}>
//                     {children}
//                 </h1>
//             )
//         case 'heading-two':
//             return (
//                 <h2 style={style} {...attributes}>
//                     {children}
//                 </h2>
//             )
//         case 'list-item':
//             return (
//                 <li style={style} {...attributes}>
//                     {children}
//                 </li>
//             )
//         case 'numbered-list':
//             return (
//                 <ol style={style} {...attributes}>
//                     {children}
//                 </ol>
//             )
//         default:
//             return (
//                 <p style={style} {...attributes}>
//                     {children}
//                 </p>
//             )
//     }
// }

// const Leaf = ({ attributes, children, leaf }: any) => {
//     if (leaf.bold) {
//         children = <strong>{children}</strong>
//     }

//     if (leaf.code) {
//         children = <code>{children}</code>
//     }

//     if (leaf.italic) {
//         children = <em>{children}</em>
//     }

//     if (leaf.underline) {
//         children = <u>{children}</u>
//     }

//     return <span {...attributes}>{children}</span>
// }

// const BlockButton = ({ format, icon }: any) => {
//     const editor = useSlate()
//     return (
//         <Button
//             active={isBlockActive(
//                 editor,
//                 format,
//                 TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
//             )}
//             onMouseDown={(event: any) => {
//                 event.preventDefault()
//                 toggleBlock(editor, format)
//             }}
//         >
//             {/* <Icon>{icon}</Icon> */}
//             {icon}
//         </Button>
//     )
// }

// const MarkButton = ({ format, icon }: any) => {
//     const editor = useSlate()
//     return (
//         <Button
//             active={isMarkActive(editor, format)}
//             onMouseDown={(event: any) => {
//                 event.preventDefault()
//                 toggleMark(editor, format)
//             }}
//         >
//             {/* <Icon>{icon}</Icon> */}
//             {icon}
//         </Button>
//     )
// }

// const initialValue: Descendant[] = [
//     {
//         type: 'paragraph',
//         children: [
//             { text: 'This is editable ' },
//             { text: 'rich', bold: true },
//             { text: ' text, ' },
//             { text: 'much', italic: true },
//             { text: ' better than a ' },
//             { text: '<textarea>', code: true },
//             { text: '!' },
//         ],
//     },
//     {
//         type: 'paragraph',
//         children: [
//             {
//                 text:
//                     "Since it's rich text, you can do things like turn a selection of text ",
//             },
//             { text: 'bold', bold: true },
//             {
//                 text:
//                     ', or add a semantically rendered block quote in the middle of the page, like this:',
//             },
//         ],
//     },
//     {
//         type: 'block-quote',
//         children: [{ text: 'A wise quote.' }],
//     },
//     {
//         type: 'paragraph',
//         align: 'center',
//         children: [{ text: 'Try it out for yourself!' }],
//     },
// ]

// export default RichTextExample
