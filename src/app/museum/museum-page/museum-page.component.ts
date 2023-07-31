import { Component, OnDestroy, OnInit } from '@angular/core';
import { MuseoService } from '../service/museo.service';
import { Museum } from 'src/app/models/museum';
import { Observable } from 'rxjs';
import { Nullish } from 'src/app/models/nullish';
import { Painting } from 'src/app/models/painting';
import { Gallery } from 'src/app/models/gallery';
import { DataParams, ValueForm } from 'src/app/models/interface';

@Component({
  selector: 'app-museum-page',
  templateUrl: './museum-page.component.html',
  styleUrls: ['./museum-page.component.scss'],
})
export class MuseumPageComponent implements OnInit, OnDestroy {
  data: Nullish<Museum>;
  observable: Observable<Museum> = this.loadData();
  observableSearch: Observable<Museum> | undefined;
  subscription = this.observable.subscribe((value) => (this.data = value));

  museum: Nullish<Museum>;
  observableFilters: Observable<Museum> = this.loadFillFilters();

  constructor(private museumService: MuseoService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.observableFilters.subscribe((museum) => (this.museum = museum)),
    );
  }

  loadData(): Observable<Museum> {
    return this.museumService.load();
  }

  loadFillFilters(): Observable<Museum> {
    return this.museumService.loadFillFilters();
  }

  editGalleries(data: DataParams): void {
    if (!this.data) {
      return;
    }

    //se è click cambia status, assegno alla funzione dinamica la funzione da eseguire
    this.data = {
      ...this.data,
      galleries: this.data.galleries.map((gallery) => {
        return this.changePaintgGallery(
          gallery,
          data,
          this.changeStatusPainting, //mi passo la funzione per riutilizzare il codice usato
        );
      }, []),
    };
    // const findIndexGallery = this.data.galleries.findIndex(
    //   (gallery) => gallery.id
    // );
    // this.data.galleries[findIndexGallery] = {
    //   ...this.data.galleries[findIndexGallery],
    //   paintings: this.changeStatusPainting(
    //     this.data.galleries[findIndexGallery].paintings,
    //     data.idPainting
    //   ),
    // };

    //   this.data = {
    //     ...this.data,
    //     galleries: this.data.galleries.reduce<Gallery[]>(
    //       (newGalleries: Gallery[], gallery) => {
    //         return [
    //           ...newGalleries,
    //           this.changePaintgGallery(gallery, data.idGallery, data.idPainting),
    //         ];
    //       },
    //       []
    //     ),
    //   };
  }

  editPaintingArtist(data: DataParams): void {
    //se è il click edit artist assegno alla variabile dinamica la funzione da eseguire
    if (!this.data) {
      return;
    }
    this.data = {
      ...this.data,
      galleries: this.data.galleries.map((gallery) => {
        return this.changePaintgGallery(gallery, data, this.editArtist);
      }, []),
    };
  }

  changePaintgGallery(
    gallery: Gallery,
    data: DataParams,
    fx: (paintings: Painting[], data: DataParams) => Painting[],
  ): Gallery {
    if (gallery.id === data.gallery.idGallery) {
      return {
        ...gallery,
        paintings: fx(gallery.paintings, data),
      };
    }
    return gallery;
  }

  changeStatusPainting(
    paintings: Painting[],
    data: { painting: { idPainting: number } },
  ): Painting[] {
    return paintings.map((painting) => {
      if (painting.id === data.painting.idPainting) {
        return {
          ...painting,
          status: !painting.status,
        };
      }
      return painting;
    });
  }

  editArtist(paintings: Painting[], data: DataParams): Painting[] {
    return paintings.map((painting) => {
      if (painting.id === data.painting.idPainting) {
        return {
          ...painting,
          details: {
            ...painting.details,
            artist: data.artist,
          },
        };
      }
      return painting;
    });
  }

  get fillSelectFilter(): ValueForm {
    return {
      artistsName: this.fillAllArtistsName,
      paintingsName: this.fillAllPaintingsName,
    };
  }

  get fillAllPaintingsName(): string[] {
    if (!this.museum) {
      return [];
    }
    //acc, current
    return this.museum?.galleries.reduce<string[]>((acc, current) => {
      current.paintings.forEach((painting) => {
        if (!acc.includes(painting.name)) {
          acc = [...acc, painting.name];
        }
      });
      return acc;
    }, []);
  }

  get fillAllArtistsName(): string[] {
    if (!this.museum) {
      return [];
    }
    return this.museum.galleries.reduce<string[]>((artists, gallery) => {
      gallery.paintings.forEach((painting) => {
        const fullName = `${painting.details.artist?.name} ${painting.details.artist?.surname}`;
        if (!artists.includes(fullName)) {
          artists = [...artists, fullName];
        }
      });
      return artists;
    }, []);
  }

  onSearch(value: ValueForm): void {
    this.observableSearch = this.loadDataSearch(value);
    this.subscription.add(
      this.observableSearch.subscribe((museum) => (this.data = museum)),
    );
  }

  loadDataSearch(value: ValueForm): Observable<Museum> {
    return this.museumService.load(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
