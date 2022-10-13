type TUserCard = {
  id?: number;
  username: string;
  gender: string | undefined;
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
  onSubmit: (user: TUserCard) => void;
};

export type { TCreateFormState, TCreateFormProps, TUserCard };
