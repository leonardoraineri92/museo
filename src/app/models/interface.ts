export interface ValueForm {
  artistsName: string[];
  paintingsStatus?: boolean | null;
  paintingsName: string[];
}

export interface DataParams {
  artist?: { name: string; surname: string };
  painting: { idPainting: number };
  gallery: { idGallery: number };
}
