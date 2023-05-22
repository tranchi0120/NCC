import { useState } from 'react';
import { IModalContent } from '../interfaces/interface';

export interface IUseModalState {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalContent: IModalContent
  setModalContent: React.Dispatch<React.SetStateAction<IModalContent>>
}

const useModal = (): IUseModalState => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [modalContent, setModalContent] = useState<IModalContent>({} as IModalContent);

  return {
    isOpen,
    setIsOpen,
    modalContent,
    setModalContent
  };
};

export default useModal;
