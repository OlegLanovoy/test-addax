 export interface Task {
  id: string;
  title: string;
  color: string;
  date: string;
}

export interface Holiday {
  date: string;
  name: string;
  localName: string;
}

export interface Country {
  countryCode: string;
  name: string;
}