import { IZone } from 'app/entities/zone/zone.model';
import { IUtilisateur } from 'app/entities/utilisateur/utilisateur.model';

export interface IEspaceVert {
  id?: number;
  libelle?: string | null;
  photo?: string | null;
  zones?: IZone[] | null;
  utilisateur?: IUtilisateur | null;
}

export class EspaceVert implements IEspaceVert {
  constructor(
    public id?: number,
    public libelle?: string | null,
    public photo?: string | null,
    public zones?: IZone[] | null,
    public utilisateur?: IUtilisateur | null
  ) {}
}

export function getEspaceVertIdentifier(espaceVert: IEspaceVert): number | undefined {
  return espaceVert.id;
}
