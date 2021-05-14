// Code and type definitions shared among backend and frontend
// Gets copied to "src/public/universal", usage in frontend: import { Entity } from "public/universal/entity"
export interface TodoItem {
  id: string;
}

export function getDefaultId() {
  return 'default-id';
}
