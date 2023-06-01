import * as React from 'react';
import type { FC } from 'react';
import { createContext, useRef } from 'react';
import useModal from '../hooks/useModal';
import { FormikProps } from 'formik';
import { IFormValues, IModalContent } from '../interfaces/interface';
import Modal from '../components/Modal/Modal';

export interface IAppModal {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>
  formRef: React.RefObject<FormikProps<IFormValues>>
}

interface IAppProviderProps {
  children: React.ReactNode
}
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AppContext = createContext<IAppModal>({} as IAppModal);

const AppProvider: FC<IAppProviderProps> = ({ children }) => {
  const { isOpen, setIsOpen, modalContent, setModalContent } = useModal();
  const formRef = useRef<FormikProps<IFormValues>>(null);

  const store = { setIsOpen, setModalContent, formRef };

  return (
    <AppContext.Provider value={store}>
      <Modal width='1200px' isOpen={isOpen} modalContent={modalContent} />
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
