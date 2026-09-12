export interface VersionTaskResponse {
  id: number;
  versionId: number;

  azureTaskId: number;
  azureTaskUrl: string;

  titulo: string;

  cliente: string;
  area: string;

  tipo: string;
  statusPlanejamento: string;

  qa: string;

  mergeRealizado: boolean;
  possuiScript: boolean;
  possuiTagVersao: boolean;
}
