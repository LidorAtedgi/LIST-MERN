import React, { useEffect, useState, useRef } from "react";
import "./ListsSidebar.css";
import CreateList from "../../pages/home/Modals/CreateList";
import DeleteList from "../../pages/home/Modals/DeleteList";
import { useAuthContext } from "../../context/AuthContext";

const ListsSidebar = ({ lists, activeListId, onSelect, refetch }) => {
  const { authUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [deleteList, setDeleteList] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (lists.length > 0) {
      onSelect(lists[0]._id);
    }
  }, [lists, onSelect]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (listId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === listId ? null : listId);
  };

  const handleEdit = (list, e) => {
    e.stopPropagation();
    setSelectedList(list);
    setShowModal(true);
    setOpenMenuId(null);
    setMobileMenuOpen(false);
  };

  const handleDelete = (list, e) => {
    e.stopPropagation();
    setDeleteList(list);
    setOpenMenuId(null);
    setMobileMenuOpen(false);
  };

  const handleSelectList = (listId) => {
    onSelect(listId);
    setMobileMenuOpen(false);
  };

  const handleCreateNew = () => {
    setShowModal(true);
    setMobileMenuOpen(false);
  };

  const isOwner = (list) => {
    if (!authUser) return false;
    return list.owner === authUser._id || list.owner?._id === authUser._id;
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>
        <h3 className="mobile-title">
          {lists.find(l => l._id === activeListId)?.name || "My Lists"}
        </h3>
        <button className="mobile-create-btn" onClick={handleCreateNew}>
          ➕
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lists-sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="flex desktop-header">
          <h3 className="sidebar-title">My Lists</h3>
          <button className="createList-btn" onClick={handleCreateNew}>
            ➕
          </button>
        </div>
        
        {lists.length === 0 && <div className="empty-lists">No lists yet</div>}

        <div className="lists-container">
          {lists.map((list) => (
            <div key={list._id} className="list-item-wrapper">
              <div
                className={`list-row ${activeListId === list._id ? "active" : ""} ${isOwner(list) ? "owner" : ""}`}
                onClick={() => handleSelectList(list._id)}
              >
                <span className="list-name">{list.name}</span>
                {isOwner(list) && (
                  <span className="owner-badge" title="You own this list">
                    👑
                  </span>
                )}
              </div>
              <div className="list-menu-container">
                <button
                  className="menu-trigger-btn"
                  onClick={(e) => toggleMenu(list._id, e)}
                >
                  ⋮
                </button>
                {openMenuId === list._id && (
                  <div className="list-dropdown-menu" ref={menuRef}>
                    <button
                      className="menu-item edit"
                      onClick={(e) => handleEdit(list, e)}
                    >
                      <span className="menu-icon">✏️</span>
                      Edit
                    </button>
                    <button
                      className="menu-item delete"
                      onClick={(e) => handleDelete(list, e)}
                    >
                      <span className="menu-icon">🗑️</span>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <CreateList
          refetch={refetch}
          onClose={() => {
            setShowModal(false);
            setSelectedList(null);
          }}
          mode={selectedList ? "update" : "create"}
          list={selectedList}
        />
      )}
      {deleteList && (
        <DeleteList
          refetch={refetch}
          onCancel={() => setDeleteList(null)}
          list={deleteList}
          onSelect={onSelect}
        />
      )}
    </>
  );
};

export default ListsSidebar;