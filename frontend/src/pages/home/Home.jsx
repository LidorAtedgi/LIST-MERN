import React, { useState } from "react";
import useLists from "../../hooks/useList";
import useItem from "../../hooks/useItem";
import useToggle from "../../hooks/useToggle";
import useDelete from "../../hooks/useDelete";
import ItemCard from "../../components/itemCard/ItemCard";
import ListsSidebar from "../../components/sidebar/ListsSidebar";
import Modal from "./Modals/Modal";
import DeleteConfirmModal from "./Modals/DeleteConfirmModal";
import "./Home.css";
import ParticipantsModal from "./Modals/ParticipantsModal";
import useUpdateItem from "../../hooks/useUpdate";

function Home() {

  const { lists, loading: loadingLists,refetch} = useLists();
  const [activeListId, setActiveListId] = useState(null);

  const { items, setItems, loading: loadingItems } = useItem(activeListId);
  const { toggle } = useToggle(setItems);
  const { deleteItem, loading: loadingDelete } = useDelete(setItems);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const { updateItem, loading: updating } = useUpdateItem(setItems);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAcquiredOnly, setShowAcquiredOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);

  const displayedItems = items
    ?.filter(item => showAcquiredOnly || !item.acquired)
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

  return (
    <div className="home-layout">

      <ListsSidebar
        lists={lists}
        activeListId={activeListId}
        onSelect={setActiveListId}
        refetch={refetch}
      />


      <div className="items-wrapper">
        {!activeListId ? (
          <div className="empty-state">
            Select a list to view items
          </div>
        ) : loadingItems ? (
          <div className="loading-center">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="home-header">
        
              <div className="header-bottom">
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button
                className="create-btn"
                onClick={() => setShowModal(true)}
              >
                ➕ 
              </button>
              <button
                className="create-btn"
                onClick={() => setShowParticipantsModal(true)}
              >
                👥
              </button>
                <label>
                  <input
                    type="checkbox"
                    checked={showAcquiredOnly}
                    onChange={e => setShowAcquiredOnly(e.target.checked)}
                  />
                  All tasks
                </label>
              </div>
            </div>

            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {displayedItems.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#9ca3af', 
                  fontSize: '16px',
                  marginTop: '40px'
                }}>
                  No items in this list
                </div>
              ) : (
                displayedItems.map(item => (
                 <ItemCard
                    key={item._id}
                    name={item.name}
                    acquired={item.acquired}
                    quantity={item.quantity || 1}   
                    loading={loadingItemId === item._id}
                    onToggle={async () => {
                      setLoadingItemId(item._id);
                      await toggle(activeListId, item._id);
                      setLoadingItemId(null);
                    }}
                    onDelete={() => setDeleteTarget(item)}
                    onUpdate={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                    onQuantityChange={async (newQty) => {
                      setLoadingItemId(item._id);
                      await updateItem(activeListId, item._id, null, newQty); 
                      setLoadingItemId(null);
                    }}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* MODALS */}
        {showModal && (
          <Modal
            listId={activeListId}
            setItems={setItems}
            item={selectedItem}
            mode={selectedItem ? "update" : "create"}
            onClose={() => {
              setShowModal(false);
              setSelectedItem(null);
            }}
          />
        )}

        {deleteTarget && (
          <DeleteConfirmModal
            item={deleteTarget}
            loading={loadingDelete}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={async () => {
              await deleteItem(activeListId, deleteTarget._id);
              setDeleteTarget(null);
            }}
          />
        )}
        {showParticipantsModal && (
        <ParticipantsModal
          listId={activeListId}
          onClose={() => setShowParticipantsModal(false)}
        />
      )}
      </div>
    </div>
  );
}

export default Home;