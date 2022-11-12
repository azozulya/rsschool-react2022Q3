interface TCreateFormValues {
  id?: string;
  username: string;
  gender: string | undefined;
  birthday: string;
  agree: boolean;
  avatar?: FileList;
  country: string;
}

type TUserCard = {
  id?: string;
  username: string;
  gender: string | undefined;
  birthday: string;
  agree: boolean;
  avatar?: string;
  country: string;
};

type TCreateFormProps = {
  onSubmit: (user: TUserCard) => void;
};

export enum EGender {
  MALE = 'Male',
  FEMAIL = 'Femail',
  OTHER = 'Other',
}

export type { TCreateFormValues, TCreateFormProps, TUserCard };
