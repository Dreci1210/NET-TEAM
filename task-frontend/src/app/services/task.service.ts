import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  public getTask(id:any): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${baserUrl}/task/${id}`);
  }

  public getTaskById(id:any): Observable<Task>{
    return this.httpClient.get<Task>(`${baserUrl}/task/obtener/${id}`);
  }

  public guardarTask(task : Task): Observable<Task>{
    return this.httpClient.post<Task>(`${baserUrl}/task/`, task);
  }

  public actualizarTask(task : any, id:any): Observable<Boolean>{
    return this.httpClient.put<Boolean>(`${baserUrl}/task/update/${id}`, task);
  }

  public deleteTask(id:any){
    return this.httpClient.delete(`${baserUrl}/task/delete/${id}`);
  }



}

export interface Task{
  description:string;
  id?: number;
  state: string;
  title: string;
  usuario_id: number;
}
