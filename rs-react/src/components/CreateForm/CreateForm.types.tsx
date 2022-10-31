interface TCreateFormValues {
  id?: number;
  username: string;
  gender: string | undefined;
  birthday: string;
  agree: boolean;
  avatar?: string;
  country: string;
}

type TUserCard = TCreateFormValues;

type TCreateFormProps = {
  onSubmit: (user: TUserCard) => void;
};

export enum EGender {
  MALE = 'Male',
  FEMAIL = 'Femail',
  OTHER = 'Other',
}

export type { TCreateFormValues, TCreateFormProps, TUserCard };
