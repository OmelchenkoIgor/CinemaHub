import {environment} from '../../../../environments/environment';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {responseSerialDTO} from '@serial/data';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  public getSerial(page: number, category: string, language: string): Observable<responseSerialDTO> {
    return this.http.get<responseSerialDTO>(`${environment.BASE_URL}/discover/${category}`, {
      params: {
        api_key: environment.API_KEY,
        language: `${language}-US`,
        page: page.toString()
      }
    });
  }

  public getSearch(category: string, query: string, page: number, language: string): Observable<responseSerialDTO> {
    return this.http.get<responseSerialDTO>(`${environment.BASE_URL}/search/${category}`, {
      params: {
        api_key: environment.API_KEY,
        query: query,
        language: `${language}-US`,
        page: page.toString()
      }
    });
  }
}
