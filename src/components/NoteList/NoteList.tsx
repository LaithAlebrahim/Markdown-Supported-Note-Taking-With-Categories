import { useMemo, useState } from "react";
import { Button, Col, Row, Stack ,Form, Modal} from "react-bootstrap";
import {  Link } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable'
import {Note, Tag} from "../../App"
import NoteCard from "./NoteCard/NoteCard"
import {EditTagsModal} from './EditTagModal/EditTag'
type NoteListProps={
    availableTags:Tag[]
    notes:Note[]
    onDeleteTag:(id:string)=>void
    onUpdateTag:(id:string,label:string)=>void
}

const NoteList = ({availableTags,notes,onDeleteTag,onUpdateTag}:NoteListProps) => {
 const [selectedTags,setSelectedTags]=useState<Tag[]>([])
 const [title,setTitle]=useState("")
 const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
 const filteredNodes = useMemo(()=>{
    return notes.filter(note=>{
        return(title===""|| note.title.toLowerCase().includes(title.toLowerCase()))&&(selectedTags.length===0|| selectedTags.every(tag=> note.tags.some(
            noteTag=>
            noteTag.id===tag.id)))
    })
 },[title,selectedTags,notes])

    return ( 
    <> 
        <Row  className="align-items-center mb-4">
            <Col>
                <h1>Notes</h1>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                     <Link to="/new">
                         <Button variant="primary">Create</Button>
                     </Link>
                     <Button variant="outline-secondary" onClick={() => setEditTagsModalIsOpen(true)}>Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title}
                        onChange={e=>setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        <CreatableReactSelect
                          options={availableTags.map(tag=>{
                          return {label:tag.label, value:tag.id}
                          })}
                         value={selectedTags.map(tag=>{
                        return {label:tag.label,value:tag.id}
                          })}
                         onChange={tags=>{
                        setSelectedTags(
                            tags.map(tag=> {
                            return {label:tag.label, id:tag.value}
                        })
                        )
                             }}
                    isMulti/>
                    </Form.Group>                
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
          {
            filteredNodes.map(note=>(
                <Col ket={note.id}>
                <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                </Col>
            ))
          }
        </Row>
        <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
    );
}


export default NoteList;
