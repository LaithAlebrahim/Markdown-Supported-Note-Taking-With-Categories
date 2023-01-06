import { NoteData,Tag } from "../../../App";
import NoteForm from "../../NewNote/CreateNote/NoteForm";
import { useNote } from "../../../utilize/Layout/NotesLayout";
type EditNoteProps={
    onSubmit: (id:string,data:NoteData)=>void
    onAddTag: (tag:Tag)=>void
    availableTags:Tag[]
}
const EditNote = ({onSubmit,onAddTag,availableTags}:EditNoteProps) => {
    const note = useNote()
    return ( <>
    <h1>Edit note</h1>
    <NoteForm
    title={note.title}
    markdown={note.markdown}
    tags={note.tags}
    onSubmit={data=>onSubmit(note.id,data)} onAddTag={onAddTag} availableTags={availableTags} />
    </> );
}
 
export default EditNote;