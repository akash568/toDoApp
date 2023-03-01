import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../toDo/models/todo.model';

const API_URL = 'http://localhost:3000/list';

/**
 * Service for API calling operations for list components
 *
 */
@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch all todo list data
   * 
   * @returns {Observable<List[]>} All ToDo List
   */
  getLists(): Observable<List[]> {
    return this.http.get<List[]>(API_URL);
  }

  /**
   * Create new todo list with given data
   * 
   * @param list List for new toDO list
   * @returns {Observable<List[]>} Added data in DB
   */
  addList(list: List): Observable<List> {
    return this.http.post<List>(API_URL, list);
  }

  /**
   * Update todo list based on given data
   * 
   * @param list List data to update in DB
   * @returns {Observable<List[]>} updated data in DB
   */
  updateList(list: List): Observable<List> {
    return this.http.patch<List>(`${API_URL}/${list.id}`, list);
  }

  /**
   * Delete list item based on given Id
   * 
   * @param id Id of record to delete
   * @returns {Observable<Object>} empty object 
   */
  deleteList(id: number): Observable<Object> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
