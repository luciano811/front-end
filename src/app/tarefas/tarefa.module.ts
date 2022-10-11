import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaRoutingModule } from './tarefa-routing.module';
import { TarefaAppComponent } from './tarefa-app.component';
import { ListarTarefaComponent } from './listar/listar-tarefa.component';
import { TarefaService } from './services/tarefa.service';
import { InserirTarefaComponent } from './inserir/inserir-tarefa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TarefaAppComponent,
    ListarTarefaComponent,
    InserirTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefaRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [TarefaService]
})
export class TarefaModule { }