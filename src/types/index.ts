export interface Reservation {
    id: string;
    username: string;
    hotel: string;
    checkIn: string;
    checkOut: string;
    status: "pending" | "approved" | "cancelled";
    message?: string;
  }

export interface selectOption  { value: string; label: string }
  

export interface hotel  {
  id: string,
  name: string
}

export interface userLogin  { username: string; password: string }

export interface userData   {
  id: string,
  username: string,
  password: string,
  role: string,
  token: string
}

