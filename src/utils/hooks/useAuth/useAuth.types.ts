export type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

export type AuthContextProps = {
  user: User | null;
  login: () => void;
  logout: () => void;
  googleToken: string | null;
};

export type AuthContextReturn = {
  user: User | null;
  googleToken: string | null;
  login: () => void;
  logout: () => void;
};
