'use clent'
import { ItemChange, ItemReference, setItemDescription } from '@/app/redux/menuCreatorSlice'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'


//Icons Imports
import BoldIcon from '../../../../public/text-icons/bold.svg'
import ItalicIcon from '../../../../public/text-icons/italic.svg'
import ClearFormattingIcon from '../../../../public/text-icons/clear-text-formatting.svg'
import UndoIcon from '../../../../public/text-icons/undo.svg'
import RedoIcon from '../../../../public/text-icons/redo.svg'

interface descriptionItemEditorProps {
  itemRef:ItemReference
  descriptionContent:string,
  htmlId:string,
}


const textEditorBtnStyle:React.CSSProperties = {
  background:'none',
  border:'0',
  padding:'2px',
  cursor:'pointer'
}

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          style={textEditorBtnStyle}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Image src={BoldIcon} alt={'Bold'} width={15} height={15} className="text-editor-icon"/>
        </button>
        <button
          style={textEditorBtnStyle}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Image src={ItalicIcon} alt={'Italic'} width={15} height={15} className="text-editor-icon"/>
        </button>
        {/*
        
          <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
        
        
        
        
        
        */}
      
        
        {/*

          <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <Image src={ClearFormattingIcon} alt={'Clear Formatting'} width={15} height={15}/>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
        */}
        {/*
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </button>
        */}
        <button
          style={textEditorBtnStyle}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <Image src={UndoIcon} alt={'Undo'} width={15} height={15} className="text-editor-icon"/>
        </button>
        <button
          style={textEditorBtnStyle}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <Image src={RedoIcon} alt={"Redo"} width={15} height={15} className="text-editor-icon"/>
        </button>
      </div>
    </div>
  )
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

  

export default function DescriptionEditor (props:descriptionItemEditorProps){

  const dispatch = useDispatch()
  

  const changeDescription = (newDescription:string)=>{
    const itemChange:ItemChange ={
      itemReference: props.itemRef,
      change: newDescription
    }
    dispatch(setItemDescription(itemChange))
  }

  return (
    <div id=''>
      <EditorProvider onUpdate={({ editor }) => changeDescription(editor.getHTML())} slotBefore={<MenuBar />} extensions={extensions} content={props.descriptionContent}></EditorProvider>
    </div>
  )
}