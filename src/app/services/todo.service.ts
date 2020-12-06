import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Todo } from '../models/Todo'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todoLimit: string = "?_limit=5";

  constructor(private http: HttpClient) { }

  // get todos
  getTodos(): Observable<Todo[]>{
    let todos = this.http.get<Todo[]>(this.todosUrl + this.todoLimit);
    return todos;
  }

  // toggle completed
  toggleCompleted(todo: Todo): Observable<any> {
    const specificTodoUrl = this.todosUrl + '/' + todo.id;
    return this.http.put(specificTodoUrl, todo, httpOptions);
  }

  // delete todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const specificTodoUrl = this.todosUrl + '/' + todo.id;
    return this.http.delete<Todo>(specificTodoUrl, httpOptions);
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, newTodo, httpOptions);
  }
}
