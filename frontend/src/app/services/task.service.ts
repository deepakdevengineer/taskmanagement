import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task, PaginatedResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api'
    : 'https://taskmanagement-6aww.onrender.com/api') + '/tasks/';

  taskChanged$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  getTasks(page: number = 1, search: string = '', status: string = ''): Observable<PaginatedResponse<Task>> {
    let params = new HttpParams().set('page', page.toString());
    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);
    
    return this.http.get<PaginatedResponse<Task>>(this.apiUrl, { params });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}${id}/`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(() => this.taskChanged$.next())
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${id}/`, task).pipe(
      tap(() => this.taskChanged$.next())
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.taskChanged$.next())
    );
  }
}
