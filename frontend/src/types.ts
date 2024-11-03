export interface User {
  id: string,
  name: string,
  email: string
  isActive?: boolean
}

export interface UserFull extends User {
  password: string;
}
