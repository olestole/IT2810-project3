import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from 'store/action';
import { AppState } from 'store/types';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    padding: '20px',
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '20rem',
    width: '30%',
    maxWidth: '60rem',
    overflow: 'hidden',
  },
};

const ReviewModal: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state: AppState) => state.modalOpen);

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => dispatch(setModalOpen(false))}
      // @ts-ignore
      style={customStyles}
      contentLabel="Review Modal"
    >
      {children}
    </Modal>
  );
};

export default ReviewModal;
