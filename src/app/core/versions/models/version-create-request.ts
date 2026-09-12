export interface VersionCreateRequest {

  numeroVersao: string;

  statusVersao: string;

  dataLimiteTarefas: string | null;

  dataPrevistaLiberacao: string | null;

  observacoes: string | null;

}
