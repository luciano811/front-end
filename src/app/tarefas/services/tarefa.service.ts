import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalStorageService } from "app/auth/services/local-storage.service";
import { environment } from "environments/environment";
import { FormsTarefaViewModel } from "../view-models/forms-tarefa.view-model";
import { ListarTarefaViewModel } from "../view-models/listar-tarefa.view-model";

@Injectable()
export class TarefaService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    const resposta = this.http
      .post<FormsTarefaViewModel>(this.apiUrl + 'tarefas', tarefa, this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));

    return resposta;
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    const resposta = this.http
      .get<ListarTarefaViewModel[]>(this.apiUrl + 'tarefas', this.obterHeadersAutorizacao())
      .pipe(map(this.processarDados), catchError(this.processarFalha));
    return resposta;
  }
  private obterHeadersAutorizacao() {
    const token = this.localStorageService.obterTokenUsuario();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }
  private processarDados(resposta: any) {
    if (resposta.sucesso)
      return resposta.dados;
  }
  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}