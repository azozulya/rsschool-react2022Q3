type TState = {
  cansubmit: boolean;
  username: string;
  gender: 'Male' | 'Female' | undefined;
  birthday: string;
  married: boolean;
  avatar: string;
  country: string;
};

type TProps = {
  value?: `Record<string, never>`;
};

export type { TState, TProps };
