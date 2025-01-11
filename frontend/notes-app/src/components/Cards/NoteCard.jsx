import React from 'react'
import moment from 'moment';
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

const NoteCard = ({
    title,
    date,
    content, 
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-md transition-all ease-in-out card-notes'> 
       <div className='flex items-cente justify-between'>
           <div>
               <h6 className='text-md font-medium'>{title}</h6>
            </div>

            <button className="w-8 h-8 flex items-center justify-center rounded-2xl hover:shadow-md transition-all ease-in-out right-10 bottom-10 pinNotes">
               <MdOutlinePushPin className={`icon-btn text-black ${isPinned}`} onClick={onPinNote} />
            </button>
      </div>

      <p className='text-sm text-slate-600 mt-2'>{content?.slice(0, 60)}</p>

      <div className='flex items-center justify-between mt-2'>
          <div className='text-xs text-slate-500 tag-text'>
            <span className='text-slate-800'>{tags.map((item) => `#${item} `)}</span> | <span className='text-xs text-slate-500'>{moment(date).format('DD MMM YYYY')}</span>
          </div>
          <div className='flex items-center-gap-6 card-button'>
                <span className="w-8 h-8 flex items-center justify-center rounded-2xl hover:shadow-md transition-all ease-in-out right-10 bottom-10 pinNotes">
                      <MdCreate 
                        className='icon-btn text-black hover:text-slate-500 edit-button' 
                        onClick={onEdit}
                      />
                </span>
             <span className="w-8 h-8 flex items-center justify-center rounded-2xl hover:shadow-md transition-all ease-in-out right-10 bottom-10 pinNotes">
                  <MdDelete
                    className='icon-btn text-black hover:text-slate500 delete-button' 
                    onClick={onDelete}
                    />
             </span>
          </div>
      </div>
    </div>
  );
};

export default NoteCard;
