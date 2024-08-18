export interface RawData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  files: FileList;
  country: string;
  terms: boolean;
}

export interface SubmitData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  files: string;
  country: string;
  terms: boolean;
}
