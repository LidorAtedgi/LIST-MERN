import React, { useState } from 'react'
import ItemCard from '../../components/itemCard/ItemCard'
import useItem from '../../hooks/useItem'
import useToggle from '../../hooks/useToggle';
import useDelete from '../../hooks/useDelete';
import Modal from './Modals/Modal';
import './Home.css'
import DeleteConfirmModal from './Modals/DeleteConfirmModal';

function Home() {
    
  const {loading: loadingItem, items, setItems} = useItem();
  const {toggle, loading: loadingToggle} = useToggle(items, setItems);
  const {deleteItem, loading: loadingDelete} = useDelete(items, setItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAcquiredOnly, setShowAcquiredOnly] = useState(false);
  const [loadingToggleItems, setLoadingToggleItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const displayedItems = items?.filter(item => !showAcquiredOnly || item.acquired)
    .filter(item => item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));

  const handleToggle = async (id) => {
    setLoadingToggleItems(prev => ({ ...prev, [id]: true }));
    await toggle(id);
    setLoadingToggleItems(prev => ({ ...prev, [id]: false }));
  }

  if(loadingItem) return (
    <div className='items-wrapper'>
      <div className='items-container'>
        <div className='loading-center'>
          <div className='spinner'></div>
        </div>
      </div>
    </div>
  )
   
  return (
    <div className='items-wrapper'>
      <div className='items-container'>
        
        <div className='home-header'>
          <div className='header-top'>
            <button className='create-btn' onClick={() => setShowModal(true)}>
              ➕ Create New Item
            </button>
          </div>

          <div className='header-bottom'>
            <div className='search-container'>
              <span className='search-icon'>🔍</span>
              <input 
                type='text' 
                className='search-input'
                placeholder='Search items...'
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <label className='filter-checkbox'>
              <input 
                type='checkbox' 
                checked={showAcquiredOnly} 
                onChange={e => setShowAcquiredOnly(e.target.checked)} 
              />
              <span>Show Acquired Only</span>
            </label>
          </div>
        </div>


        {loadingDelete ? (
          <div className='loading-center'>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {displayedItems?.map(item => (
              <ItemCard 
                key={item._id}
                name={item.name}  
                acquired={item.acquired}
                loading={loadingToggleItems[item._id]} 
                onToggle={() => handleToggle(item._id)}
                onDelete={() => setDeleteTarget(item)}
                onUpdate={() => {setSelectedItem(item); setShowModal(true);}}
              />
            ))}
          </>
        )}

        {/* Modal */}
        {showModal && (
          <Modal
            setItems={setItems}
            onClose={() => {setShowModal(false); setSelectedItem(null);}}
            mode={selectedItem ? "update" : "create"}
            item={selectedItem}
          />
        )}
                {deleteTarget && (
               <DeleteConfirmModal
                item={deleteTarget}
                loading={loadingDelete}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={async () => {
                await deleteItem(deleteTarget._id);
                setDeleteTarget(null);
            }}
          />
        )}

      </div>
    </div>
  )
}

export default Home