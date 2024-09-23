import {environment} from '@environments/environment';
import {Category, Language, responseCinemaDTO, Type} from '@content/cinema';
import {responseSerialDTO} from '@content/serial';
import {inject, Injectable} from '@angular/core';
import {responseMovieDTO} from '@content/movie';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  public getCinema(type: Type, category: Category, page: number, language: Language, query?: string): Observable<responseCinemaDTO | responseMovieDTO | responseSerialDTO> {
    const categoryWithTimeframe: string = type === 'trending' ? `${category}/day` : category;

    let params: { api_key: string, language: string, page: string, query?: string } = {
      api_key: environment.API_KEY,
      language: `${language}-US`,
      page: page.toString()
    };

    if (query) {
      params['query'] = query;
    }

    return this.http.get<responseCinemaDTO | responseMovieDTO | responseSerialDTO>(`${environment.BASE_URL}/${type}/${categoryWithTimeframe}`, { params });
  }

  public getSearch(type: Type, category: Category, page: number, language: Language, query: string): Observable<responseCinemaDTO | responseMovieDTO | responseSerialDTO> {
    let params: { api_key: string, query: string, language: string, page: string } = {
      api_key: environment.API_KEY,
      query: query,
      language: `${language}-US`,
      page: page.toString()
    };

    return this.http.get<responseCinemaDTO | responseMovieDTO | responseSerialDTO>(`${environment.BASE_URL}/${type}/${category}`, { params });
  }
}
