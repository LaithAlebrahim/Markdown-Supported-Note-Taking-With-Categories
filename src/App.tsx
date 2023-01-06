import  { useMemo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {Routes,Navigate,Route} from 'react-router-dom'
import { Container} from 'react-bootstrap'
import NewNote from './components/NewNote/NewNote'
import {useLocalStorage} from './utilize/LocalStorage'
import {v4 as uuidV4} from 'uuid'
import NoteList from './components/NoteList/NoteList'
import NoteLayout from './utilize/Layout/NotesLayout'
import Note from './components/Note/Note'
import EditNote from './components/Note/EditNote/EditNote'

export type Note={
  id:string
} & NoteData
export type RawNote ={
  id:string
}&RawNoteData
export type RawNoteData ={
  title:string
  markdown:string
  tagids: string[]
}
export type NoteData ={
  title:string
  markdown:string
  tags: Tag[]
}
export type Tag={
  id:string
  label:string

}


function App() {
const [notes,setNotes]= useLocalStorage<RawNote[]>("NOTES",[])
const [tags,setTags]= useLocalStorage<Tag[]>("TAGS",[])
const notesWithTags= useMemo(() => {
  return notes.map(note=>{
    return{...note,tags:tags.filter(tag=>note.tagids.includes(tag.id))}
  })
},[notes,tags])
function onCreateNote({tags,...data}:NoteData){
  setNotes(prevNote => {
    return [...prevNote,{...data,id:uuidV4(),tagids:tags.map(tag=>tag.id)}]
  })
}
function onUpdateNote(id: string, { tags, ...data }: NoteData) {
  setNotes(prevNotes => {
    return prevNotes.map(note => {
      if (note.id === id) {
        return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
      } else {
        return note
      }
    })
  })
}
function addTag(tag:Tag){
  setTags(prev=>[...prev,tag])
}

function onDeleteNote(id: string) {
  setNotes(prevNotes => {
    return prevNotes.filter(note => note.id !== id)
  })
}
function onUpdateTag(id:string,label:string){
  setTags(prevTags=>{
    return prevTags.map(tag=>{
      if(tag.id===id)
      {
        return {...tag,label}

      }
      else {
        return tag
      }
    })
  })
}
function onDeleteTag(id:string){
  setTags(prevTags => {
    return prevTags.filter(tag => tag.id !== id)
  })
}
  return (
 <Container className="my-4">
  <Routes>
    <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag}/>}/>
    <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}/>
    <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
      <Route index element ={<Note onDelete={onDeleteNote}/>}/>
      <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>
</Container>   
 
  );
}

export default App;
