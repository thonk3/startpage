import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react'

// do add category here
// render eacj categpry
const LinkCard = (props) => {
    const { 
        data, id, deleteCat,
        linkOp
    } = props;

    const [text, setText] = useState("");
    const [url, setUrl] = useState("");

    const [editMode, setEditMode] = useState(false);

    const onChangeText = (e) => setText(e.target.value);
    const onChangeUrl = (e) => setUrl(e.target.value);
    const toggleEdit = () => setEditMode(!editMode);


    // show edit mode
    // add link, delete category
    // edit links
    const renderEditMode = () => {  // currently add new link
        if (editMode)
            return <>
                <TextField onChange={onChangeText} value={text} placeholder="text" />
                <TextField onChange={onChangeUrl} value={url} placeholder="url" />
                <Button onClick={() => {
                    linkOp.addLink(id, text, url);
                    setText(""); setUrl("");
                    toggleEdit(!editMode);
                }} >Add New Link</Button>
            </>
    }

    // display delete category
    const renderEditButtons = () => {
        if (editMode)
            return <>
                <Button onClick={() => { toggleEdit(); deleteCat(id) }}> delete {data.cat} - {id} </Button>
            </>
    }

    const renderLinks = () => data.links.map((e,i) => {
        return <a style={{textDecoration: "none", marginLeft: "20px"}} href={e.url}>{e.text}</a>
    })

    return (
        <div>
            {/* add category */}
            {/* normal */}
            {renderEditButtons()}
            <Button onClick={toggleEdit} >Edit</Button>
            <h3>/{data.cat}/ {renderLinks()}</h3>
            <br />

            <ul>
                {renderEditMode()}
                {data.links.map((e, i) => 
                    <RenderLink key={i} linkID={i} catID={id} link={e} editMode={editMode}
                        toggleEdit={toggleEdit}
                        deleteLink={linkOp.deleteLink} updateLink={linkOp.updateLink} />)}
            </ul>
        </div>
    )
}

// ________________________________________________________________________________

const RenderLink = props => {
    const { 
        editMode, link,
        catID, linkID, 
        deleteLink, updateLink,
        toggleEdit
    } = props;

    const [lText, setLText] = useState(link.text);
    const [lUrl, setLUrl] = useState(link.url);

    const update = () => {
        updateLink(catID, linkID, lText, lUrl);
        toggleEdit()
    }

    if (editMode)
        return <>
            <TextField onChange={(e) => setLText(e.target.value)} value={lText} placeholder="text" />
            <TextField onChange={(e) => setLUrl(e.target.value)} value={lUrl} placeholder="url" />
            <Button onClick={update} >edit</Button>
            <Button onClick={() => deleteLink(catID, linkID)} >delete</Button>
        </>

    else
        return <li><a href={`https://${lUrl}`}>{lText}</a></li>
}

export default LinkCard
