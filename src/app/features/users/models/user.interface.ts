export interface IUser {
  name: string;
  email: string;
  phone: string;
  id?: number;
  username?: string;
  website?: string;
  company?: {
    bs: string,
    catchPhrase: string,
    name: string,
  };
  address?: {
    city: string,
    geo: {
      lat: string,
      lng: string,
    },
    street: string,
    suite: string,
    zipcode: string,
  }
}