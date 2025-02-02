import React, {useState} from 'react'
import moment from 'moment';
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
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

  const [showAllTags, setShowAllTags] = useState(false);

  const truncateTag = (tag, maxLength = 10) => {
    return tag.length > maxLength ? `${tag.substring(0, maxLength)}...` : tag;
  };

  return (
    <>
       <div className='border rounded p-4 bg-white hover:shadow-md transition-all ease-in-out card-notes'> 
       <div className='flex items-cente justify-between'>
           <div>
               <h6 className='text-md font-medium'>{title}</h6>
               <span className='text-xs text-slate-500'>{moment(date).format('DD MMM YYYY')}</span>
            </div>

            <button className="w-8 h-8 flex items-center justify-center rounded-2xl hover:shadow-md transition-all ease-in-out right-10 bottom-10 translate-y-[-10px] translate-x-[10px] pinNotes group">
               {/*<MdOutlinePushPin className={`icon-btn text-black ${isPinned}`} onClick={onPinNote} />*/}
               {isPinned ? (
                <>
                  <MdPushPin 
                    className="icon-btn text-red-600 hover:text-red-600" 
                    onClick={onPinNote}
                    size={20}
                  />
                  <span className="fixed hidden group-hover:block w-40 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out translate-y-[35px] translate-x-[-25px] unpin-tooltip">
                    Unpin note
                  </span>
                </>
                ) : (
                  <>
                  <MdOutlinePushPin 
                    className="icon-btn text-slate-600 hover:text-slate-600" 
                    onClick={onPinNote}
                    size={20}
                  />
                  <span className="fixed hidden group-hover:block w-20 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out translate-y-[35px] translate-x-[-23px]">
                    Pin note
                  </span>
                  </>
                )}
            </button>
      </div>

      {/*<p className='text-sm text-slate-600 mt-2'>{content?.slice(0, 60)}</p>*/}
      <p className='text-sm text-slate-600 mt-2 min-h-[60px] max-h-[120px] overflow-y-auto break-words whitespace-pre-wrap'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: '4',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {content}
      </p>

      <div className='flex items-center justify-between mt-2'>
          <div className='text-xs text-slate-500 tag-text'>
            {/*<span className='text-slate-800'>{tags.map((item) => `#${item}, `)}</span> <span className='text-slate-800'>{tags.map((item, index) => `#${item}${index !== tags.length - 1 ? ', ' : ''}`)}</span>* <span className='text-slate-800'>{tags.slice(0, 3).map((item, index) => `#${item}${index !== Math.min(tags.length - 1, 2) ? ', ' : ''}`)}{tags.length > 2 && ` +${tags.length - 2} more`}</span>*/} 
            <span className='text-slate-800'>
            {showAllTags ? (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map((item, index) => (
                    <span key={index} title={item}>
                      #{truncateTag(item)}{index !== tags.length - 1 ? ' , ' : ''}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span 
                      className="ml-2 text-black-600 hover:text-grey-800 cursor-pointer bg-blue-50 px-2 py-1 rounded-md shadow-sm hover:shadow-md transition-shadow ease-in-out hide-tags"
                      onClick={() => setShowAllTags(false)}
                    >
                      Hide Tags
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 3).map((item, index) => (
                    <span key={index} title={item}>
                      #{truncateTag(item)}{index !== Math.min(2, tags.length - 1) ? ' , ' : ''}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span 
                      className="ml-2 text-black-600 hover:text-grey-800 cursor-pointer bg-blue-50 px-2 py-1 rounded-md shadow-sm hover:shadow-md transition-shadow ease-in-out show-tags"
                      onClick={() => setShowAllTags(true)}
                    >
                      +{tags.length - 3} Tags
                    </span>
                  )}
                </div>
              )}
            </span>
          </div>
          <div className='flex items-center-gap-6 card-button'>
                <span className="w-8 h-8 flex items-center justify-center rounded-2xl hover:shadow-md transition-all ease-in-out right-10 bottom-10 pinNotes group">
                      <MdCreate 
                        className='icon-btn text-slate-600 hover:text-slate-500 edit-button' 
                        onClick={onEdit}
                      />
                      <span className="absolute hidden group-hover:block w-15 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out translate-y-[35px] translate-x-[-10px]">
                        Edit note
                      </span>
                </span>
             <span className="w-8 h-8 flex items-center justify-center rounded-2xl hover:shadow-md transition-all ease-in-out right-10 bottom-10 pinNotes group">
                  <MdDelete
                    className='icon-btn text-slate-600 hover:text-slate500 delete-button' 
                    onClick={onDelete}
                    />
                    <span className="absolute hidden group-hover:block w-30 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out translate-y-[35px] translate-x-[-10px]">
                      Delete note
                    </span>
             </span>
          </div>
      </div>
    </div>
    </>
  );
};

export default NoteCard;
