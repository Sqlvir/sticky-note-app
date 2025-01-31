import React, { useState } from 'react'
import TagInout from '../../components/Input/TagInout'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';


const AddEditNotes = ({noteData, type, getAllNotes, onClose, showToastMessage}) => {

   const [title, setTitle] = useState(noteData?.title || "");
   const [content, setContent] = useState(noteData?.content || "");
   const [tags, setTags] = useState(noteData?.tags || []);

   const [error, setError] = useState(null);

   const addNewNote = async () => {
    try {
       const response = await axiosInstance.post("/add-note", {
         title,
         content,
         tags,
       });

       if (response.data && response.data.note){
          showToastMessage("Note Added Successfully")
          getAllNotes();
          onClose();
       }
    } catch (error) {
       if (
         error.response && 
         error.response.data &&
         error.response.data.message
       ) {
         setError(error.response.data.message);
       }
    }
 };

 const editNote = async () => {
   const noteId = noteData._id;

  try {
    const response = await axiosInstance.put("/edit-note/" + noteId, {
      title,
      content,
      tags,
    });

    if (response.data && response.data.note){
       showToastMessage("Note Updated Successfully")
       getAllNotes();
       onClose();
    }
 } catch (error) {
    if (
      error.response && 
      error.response.data &&
      error.response.data.message
    ) {
      setError(error.response.data.message);
    }
 }
};

 const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content){
       setError("Please enter the content");
       return;
    }

    setError("");

    if(type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
 }

  return (
    <div className='relative'>
       <button 
         className='w-9 h-9 rounded-3xl flex items-center justify-center absolute -top-4 -right-4 shadow-sm transition-all duration-200 hover:shadow-sm closed-button'
         onClick={onClose}
       >
         <MdClose className="text-2xl hover:text-slate-800" />
       </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input type="text" className='text-sm text-slate-950 rounded border px-2 py-1 outline-none' placeholder='Enter title' 
           value={title}
           onChange={({target}) => setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Description</label>
        <textarea type="text" className='text-sm text-slate-950 rounded outline-none bg-slate-50 p-2 rounded'
          placeholder='Enter description'
          rows={10}
          value={content}
           onChange={({target}) => setContent(target.value)}
        />

      </div>

      <div className='mt-3'>
         <label className='input-label'>Tags</label>
         <TagInout tags={tags} setTags={setTags}/>
      </div>
      {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
      <button className='btn-primary font-medium mt-5 p-3 add-Notes' onClick={handleAddNote}>
         {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  )
}

export default AddEditNotes
