import { TCard } from '../Cards/Card/types';

type TModalProps = {
  id: number;
  onClose: () => void;
};

type TModalState = {
  movie: TCard | null;
};

export type { TModalProps, TModalState };
