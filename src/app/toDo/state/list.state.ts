import { List } from '../models/todo.model';

export interface ListState {
  lists: List[];
}

export const initialState: ListState = {
  lists: [],
};
