export interface VersionUpdateRequest {

  numeroVersao: string;

  statusVersao: string;

  dataLimiteTarefas: string | null;

  dataPrevistaLiberacao: string | null;

  dataLiberacaoReal: string | null;

  observacoes: string | null;

}
