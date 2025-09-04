import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  public getModules(): Observable<any> {
    return this.http.get(environment.url + "display_module");
  }

  public getModule(data): Observable<any> {
    return this.http.post(environment.url + "get_module", data);
  }

  public getModulesTeacher(): Observable<any> {
    return this.http.get(environment.url + "display_module_teacher");
  }

}
