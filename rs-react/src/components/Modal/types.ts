import { TCard } from '../Cards/Card/types';

type TModalProps = {
  id: number;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
};

type TModalState = {
  movie: TCard | null;
};

export type { TModalProps, TModalState };
