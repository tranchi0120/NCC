import * as React from 'react';
import type { FC } from 'react';
import { Divider as ADivider, Modal as AModal, ModalProps } from 'antd';

import Button from '../Button/Button';
import { AppContext } from '../../context/AppContext';

import './Modal.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import ERoute from '../../router/RouterLink';
import { deleteUserSelected, selectProjectStore } from '../../redux/slice/ProjectSlice';

export interface IModalContent {
  title: string
  children: React.ReactNode
}
interface IModalProps extends ModalProps {
  modalContent: IModalContent
  isOpen: boolean
}

const Modal: FC<IModalProps> = ({ modalContent, isOpen, ...rest }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setIsOpen, formRef } = React.useContext(AppContext);
  const {
    createProject: {
      isLoading
    }
  } = useAppSelector(selectProjectStore);

  const handleSubmit = (): void => {
    formRef.current?.handleSubmit();
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
    formRef.current?.resetForm();
    dispatch(deleteUserSelected());
    navigate(ERoute.PROJECT);
  };

  return (
    <AModal
      className='modal'
      title={modalContent.title}
      centered
      open={isOpen}
      onCancel={handleCloseModal}
      footer={[
        <Button key='cancel' className='modal-btn-cancel' onClick={handleCloseModal} isDisabled={isLoading}>
          Cancel
        </Button>,
        <Button key='save' className='modal-btn-save' htmlType='submit' onClick={handleSubmit} loading={isLoading}>
          Save
        </Button>
      ]}
      {...rest}
    >
      <ADivider />
      <div className='wrapper-chilren'>{modalContent.children}</div>
    </AModal>
  );
};

export default Modal;
