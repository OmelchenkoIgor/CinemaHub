import {MovieDTO, responseCinemaDTO, responseMovieDTO, responseSerialDTO, SerialDTO} from '@data/dto';
import {Category, Language, Range, Type} from '@shared/type';
import {environment} from '@environments/environment';
import {inject, Injectable} from '@angular/core';
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

    return this.http.get<responseCinemaDTO | responseMovieDTO | responseSerialDTO>(`${environment.BASE_URL}/${type}/${categoryWithTimeframe}`, {params});
  }

  public getTrending(type: Type, category: Category, language: Language, range: Range): Observable<responseCinemaDTO> {
    const categoryWithTimeframe: string = type === 'trending' ? `${category}/${range}` : category;

    let params: { api_key: string, language: string } = {
      api_key: environment.API_KEY,
      language: `${language}-US`,
    };

    return this.http.get<responseCinemaDTO>(`${environment.BASE_URL}/${type}/${categoryWithTimeframe}`, {params});
  }

  public getSearch(type: Type, category: Category, page: number, language: Language, query: string): Observable<responseCinemaDTO | responseMovieDTO | responseSerialDTO> {
    let params: { api_key: string, query: string, language: string, page: string } = {
      api_key: environment.API_KEY,
      query: query,
      language: `${language}-US`,
      page: page.toString()
    };

    return this.http.get<responseCinemaDTO | responseMovieDTO | responseSerialDTO>(`${environment.BASE_URL}/${type}/${category}`, {params});
  }

  public getDetail(type: Category, id: string, language: Language): Observable<MovieDTO | SerialDTO> {
    let params: { api_key: string; language: string } = {
      api_key: environment.API_KEY,
      language: `${language}-US`
    };

    return this.http.get<any>(`${environment.BASE_URL}/${type}/${id}`, {params});
  }

  public getMovieVideos(type: Category, movieId: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/${type}/${movieId}/videos?api_key=${environment.API_KEY}`);
  }

  public getMovieCast(type: string, movieId: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${movieId}/credits?api_key=${environment.API_KEY}`);
  }

  public getAboutData(type: string, id: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}/keywords?api_key=${environment.API_KEY}`);
  }

}
