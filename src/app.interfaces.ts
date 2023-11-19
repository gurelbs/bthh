export interface News {
  title: string;
  link: string;
  time?: string;
  img?: string;
}

export interface Hostage {
  name: string;
  age: string;
  address: string;
  tag: string;
  img: string;
  news?: News[];
  link?: string;
}
