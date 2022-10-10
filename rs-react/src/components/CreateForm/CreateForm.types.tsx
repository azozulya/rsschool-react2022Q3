import { ReactNode } from 'react';

type TUserCard = {
  id?: number;
  username: string;
  gender: string;
  birthday: string;
  agree: boolean;
  avatar: string;
  country: string;
};

export enum EGender {
  MALE = 'Male',
  FEMAIL = 'Femail',
  OTHER = 'Other',
}

type TCreateFormState = {
  canSubmit: boolean;
  showError: boolean;
  showSuccessMessage: boolean;
  user: TUserCard;
};

type TCreateFormProps = {
  onAdd: (user: TUserCard) => void;
  children?: ReactNode | ReactNode[];
};

export type { TCreateFormState, TCreateFormProps, TUserCard };
