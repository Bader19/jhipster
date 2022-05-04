import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EspaceVertService } from '../service/espace-vert.service';
import { IEspaceVert, EspaceVert } from '../espace-vert.model';
import { IUtilisateur } from 'app/entities/utilisateur/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/service/utilisateur.service';

import { EspaceVertUpdateComponent } from './espace-vert-update.component';

describe('EspaceVert Management Update Component', () => {
  let comp: EspaceVertUpdateComponent;
  let fixture: ComponentFixture<EspaceVertUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let espaceVertService: EspaceVertService;
  let utilisateurService: UtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EspaceVertUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EspaceVertUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EspaceVertUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    espaceVertService = TestBed.inject(EspaceVertService);
    utilisateurService = TestBed.inject(UtilisateurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Utilisateur query and add missing value', () => {
      const espaceVert: IEspaceVert = { id: 456 };
      const utilisateur: IUtilisateur = { id: 77421 };
      espaceVert.utilisateur = utilisateur;

      const utilisateurCollection: IUtilisateur[] = [{ id: 17406 }];
      jest.spyOn(utilisateurService, 'query').mockReturnValue(of(new HttpResponse({ body: utilisateurCollection })));
      const additionalUtilisateurs = [utilisateur];
      const expectedCollection: IUtilisateur[] = [...additionalUtilisateurs, ...utilisateurCollection];
      jest.spyOn(utilisateurService, 'addUtilisateurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ espaceVert });
      comp.ngOnInit();

      expect(utilisateurService.query).toHaveBeenCalled();
      expect(utilisateurService.addUtilisateurToCollectionIfMissing).toHaveBeenCalledWith(utilisateurCollection, ...additionalUtilisateurs);
      expect(comp.utilisateursSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const espaceVert: IEspaceVert = { id: 456 };
      const utilisateur: IUtilisateur = { id: 86715 };
      espaceVert.utilisateur = utilisateur;

      activatedRoute.data = of({ espaceVert });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(espaceVert));
      expect(comp.utilisateursSharedCollection).toContain(utilisateur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EspaceVert>>();
      const espaceVert = { id: 123 };
      jest.spyOn(espaceVertService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ espaceVert });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: espaceVert }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(espaceVertService.update).toHaveBeenCalledWith(espaceVert);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EspaceVert>>();
      const espaceVert = new EspaceVert();
      jest.spyOn(espaceVertService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ espaceVert });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: espaceVert }));
      saveSubject.complete();

      // THEN
      expect(espaceVertService.create).toHaveBeenCalledWith(espaceVert);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EspaceVert>>();
      const espaceVert = { id: 123 };
      jest.spyOn(espaceVertService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ espaceVert });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(espaceVertService.update).toHaveBeenCalledWith(espaceVert);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUtilisateurById', () => {
      it('Should return tracked Utilisateur primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackUtilisateurById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
