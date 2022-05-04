import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEspaceVert, EspaceVert } from '../espace-vert.model';
import { EspaceVertService } from '../service/espace-vert.service';
import { IUtilisateur } from 'app/entities/utilisateur/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/service/utilisateur.service';

@Component({
  selector: 'jhi-espace-vert-update',
  templateUrl: './espace-vert-update.component.html',
})
export class EspaceVertUpdateComponent implements OnInit {
  isSaving = false;

  utilisateursSharedCollection: IUtilisateur[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [],
    photo: [],
    utilisateur: [],
  });

  constructor(
    protected espaceVertService: EspaceVertService,
    protected utilisateurService: UtilisateurService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ espaceVert }) => {
      this.updateForm(espaceVert);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const espaceVert = this.createFromForm();
    if (espaceVert.id !== undefined) {
      this.subscribeToSaveResponse(this.espaceVertService.update(espaceVert));
    } else {
      this.subscribeToSaveResponse(this.espaceVertService.create(espaceVert));
    }
  }

  trackUtilisateurById(_index: number, item: IUtilisateur): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEspaceVert>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(espaceVert: IEspaceVert): void {
    this.editForm.patchValue({
      id: espaceVert.id,
      libelle: espaceVert.libelle,
      photo: espaceVert.photo,
      utilisateur: espaceVert.utilisateur,
    });

    this.utilisateursSharedCollection = this.utilisateurService.addUtilisateurToCollectionIfMissing(
      this.utilisateursSharedCollection,
      espaceVert.utilisateur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.utilisateurService
      .query()
      .pipe(map((res: HttpResponse<IUtilisateur[]>) => res.body ?? []))
      .pipe(
        map((utilisateurs: IUtilisateur[]) =>
          this.utilisateurService.addUtilisateurToCollectionIfMissing(utilisateurs, this.editForm.get('utilisateur')!.value)
        )
      )
      .subscribe((utilisateurs: IUtilisateur[]) => (this.utilisateursSharedCollection = utilisateurs));
  }

  protected createFromForm(): IEspaceVert {
    return {
      ...new EspaceVert(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      utilisateur: this.editForm.get(['utilisateur'])!.value,
    };
  }
}
