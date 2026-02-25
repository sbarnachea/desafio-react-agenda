export interface User {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export type CreateUserDto = {
  name: string;
  description: string;
  photo: string;
};
