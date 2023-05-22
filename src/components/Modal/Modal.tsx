import * as React from 'react';
import type { FC } from 'react';
import { useContext } from 'react';
import clsx from 'clsx';
import { Divider as ADivider, Modal as AModal, ModalProps } from 'antd';

import Button from '../Button/Button';
import { AppContext } from '../../context/AppProvider';

import './Modal.scss';

export interface IModalContent {
  title: string
  children: React.ReactNode
}

interface IModalProps extends ModalProps {
  className?: string
  modalContent: IModalContent
  isOpen: boolean
}

const Modal: FC<IModalProps> = ({ className, modalContent, isOpen, ...rest }) => {
  const { setIsOpen, formRef } = useContext(AppContext);

  const handleSubmit = (): void => {
    formRef.current?.handleSubmit();
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
    formRef.current?.resetForm();
  };

  return (
    <AModal
      className={clsx('modal', className)}
      title={modalContent.title}
      centered
      open={isOpen}
      onCancel={handleCloseModal}
      footer={[
        <Button key='cancel' className='modal-btn-cancel' onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button key='save' className='modal-btn-save' htmlType='submit' onClick={handleSubmit}>
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
