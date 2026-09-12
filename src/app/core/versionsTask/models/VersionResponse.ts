export interface VersionResponse {

  id: number;

  numeroVersao: string;

  statusVersao: string;

  dataCriacao?: string | null;

  dataLimiteTarefas?: string | null;

  dataPrevistaLiberacao?: string | null;

  dataLiberacaoReal?: string | null;

  observacoes?: string | null;

  criadorId: number;

  criadorNome?: string | null;

}
