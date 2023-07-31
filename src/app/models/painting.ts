export interface Painting {
  id: number ;
  name: string ;
  price: number ;
  img?: string ;
  status: boolean ;
  details: PaintingDetails ;
}

export interface PaintingDetails {
  artist?: PaintingDetailArtist;
  year: string ;
  heigth: number ;
  width: number ;
}

export interface PaintingDetailArtist {
  name: string ;
  surname: string ;
}
