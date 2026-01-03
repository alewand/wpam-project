export interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export interface UpdateNameRequest {
  name: string;
}

export interface UpdateEmailRequest {
  email: string;
  password: string;
}

export interface UpdatePasswordRequest {
  newPassword: string;
  password: string;
}

export interface DeleteAccountRequest {
  password: string;
}

