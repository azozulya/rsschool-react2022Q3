type TUserCard = {
  id?: number;
  username: string;
  gender: string;
  birthday: string;
  married: boolean;
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
  user: TUserCard;
};

type TCreateFormProps = {
  onAdd: (user: TUserCard) => void;
};

export type { TCreateFormState, TCreateFormProps, TUserCard };
