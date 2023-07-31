import { Observable, of } from 'rxjs';
import { ValueForm } from 'src/app/models/interface';
import { Museum } from 'src/app/models/museum';

export class MuseoService {
  museum: Museum = {
    id: 1,
    name: 'Museo del Louvre',
    galleries: [
      {
        id: 1,
        name: 'Nome Galleria 1',
        paintings: [
          {
            id: 1,
            name: 'Nome Quadro 1',
            price: 300,
            img: 'https://www.irenedurbano.it/wp-content/uploads/2021/02/eco-lestate-che-se-ne-va-60x60-1.jpg',
            status: true,
            details: {
              artist: {
                name: 'Leonardo',
                surname: 'Da Vinci',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
          {
            id: 2,
            name: 'Nome Quadro 2',
            price: 400,
            img: 'https://www.irenedurbano.it/wp-content/uploads/2021/02/eco-levare-del-sole-105x70-1.jpg',
            status: true,
            details: {
              artist: {
                name: 'Picasso',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
          {
            id: 3,
            name: 'Nome Quadro 3',
            price: 700,
            img: 'https://www.pitturiamo.com/it/immagine/quadro-moderno/quadri-moderni-dipinti-a-mano-fiori-albero-vita-astratto-su-tela-artigianale-146570.jpg',
            status: true,
            details: {
              artist: {
                name: 'Monet',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
        ],
      },
      {
        id: 2,
        name: 'Nome Galleria 2',
        paintings: [
          {
            id: 1,
            name: 'Nome Quadro 4',
            price: 600,
            img: 'https://agavequadri.it/wp-content/uploads/2020/01/AG110044.jpg',
            status: false,
            details: {
              artist: {
                name: 'Munch',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
          {
            id: 2,
            name: 'Nome Quadro 5',
            price: 1000,
            img: 'https://www.pitturiamo.com/it/immagine/quadro-moderno/quadri-moderni-dipinti-a-mano-fiori-albero-vita-astratto-su-tela-artigianale-146570.jpg',
            status: true,
            details: {
              artist: {
                name: 'Riccardo',
                surname: 'Petralia',
              },
              year: '2023',
              heigth: 40,
              width: 70,
            },
          },
          {
            id: 3,
            name: 'Nome Quadro 6',
            price: 1000,
            img: 'https://www.irenedurbano.it/wp-content/uploads/2021/02/eco-lestate-che-se-ne-va-60x60-1.jpg',
            status: true,
            details: {
              artist: {
                name: 'Van gogh',
                surname: '',
              },
              year: '1600',
              heigth: 30,
              width: 60,
            },
          },
        ],
      },
    ],
  };

  loadFillFilters(): Observable<Museum> {
    return of(this.museum);
  }

  load(filters?: ValueForm): Observable<Museum> {
    return of(this.searchPaintings(filters));
  }

  searchPaintings(filters?: ValueForm): Museum {
    let newMuseum = { ...this.museum };
    if (filters) {
      if (filters.artistsName?.length) {
        newMuseum = { ...newMuseum, ...this.filterArtists(newMuseum, filters) };
      }
      if (filters.paintingsStatus != null) {
        newMuseum = { ...newMuseum, ...this.filterStatus(newMuseum, filters) };
      }
      if (filters.paintingsName?.length) {
        newMuseum = {
          ...newMuseum,
          ...this.filterPaintings(newMuseum, filters),
        };
      }
    }
    return newMuseum;
  }

  filterArtists(museum: Museum, value: ValueForm): Museum {
    return {
      ...museum,
      galleries: museum.galleries
        .map((gallery) => {
          return {
            ...gallery,
            paintings: gallery.paintings.filter((painting) => {
              return value.artistsName.some(
                (artistName) =>
                  artistName ===
                  `${painting.details.artist?.name} ${painting.details.artist?.surname}`,
              );
            }),
          };
        })
        .filter((gallery) => gallery.paintings.length),
    };
  }

  filterStatus(museum: Museum, value: ValueForm): Museum {
    return {
      ...museum,
      galleries: museum.galleries
        .map((gallery) => {
          return {
            ...gallery,
            paintings: gallery.paintings.filter((painting) => {
              return painting.status == value.paintingsStatus;
            }),
          };
        })
        .filter((gallery) => gallery.paintings.length),
    };
  }

  filterPaintings(museum: Museum, value: ValueForm): Museum {
    return {
      ...museum,
      galleries: museum.galleries
        .map((gallery) => {
          return {
            ...gallery,
            paintings: gallery.paintings.filter((painting) => {
              return value.paintingsName.includes(painting.name);
            }),
          };
        })
        .filter((gallery) => gallery.paintings.length),
    };
  }
}
