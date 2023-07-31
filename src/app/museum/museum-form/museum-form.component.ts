import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaintingDetailArtist } from 'src/app/models/painting';

@Component({
  selector: 'app-museum-form',
  templateUrl: './museum-form.component.html',
  styleUrls: ['./museum-form.component.scss'],
})
export class MuseumFormComponent implements OnChanges {
  //*ci sono due modi per rilevare il cambiamento dell'input:
  //*tramite Input SET dove setto il valore della proprietò al cambiamento

  // //----------------METODO SET----------------------------------
  // //varaibile di appoggio dove l'input passerà i valori e scriverà nel template in ngmodel
  // //paintingDetailArtist: PaintingDetailArtist | undefined;
  // @Output() editArtist = new EventEmitter();
  // copyDetailArtist: PaintingDetailArtist = { name: '', surname: '' };

  // @Input('paintingDetail') set fx(event: PaintingDetailArtist | undefined) {
  //   this.paintingDetailArtist = event;
  //   if (event) {
  //     this.setArtist(event);
  //   }
  // }

  // setArtist(data: PaintingDetailArtist) {
  //   this.setName(data.name);
  //   this.setSurname(data.surname);
  // }

  // setName(name: string) {
  //   this.copyDetailArtist = { ...this.copyDetailArtist, name };
  // }

  // setSurname(surname: string) {
  //   this.copyDetailArtist = { ...this.copyDetailArtist, surname };
  // }

  // onEditArtist() {
  //   const data = { artist: this.copyDetailArtist };
  //   this.editArtist.emit(data);
  // }
  // //----------------METODO SET----------------------------------

  //---------------------METODO ONCHANGES--------------------------
  @Input() paintingDetail: PaintingDetailArtist | undefined;
  @Output() editArtist = new EventEmitter();
  copyPaintingDetailArtist: PaintingDetailArtist = { name: '', surname: '' };

  ngOnChanges(changes: SimpleChanges): void {
    const { paintingDetail: paintingDetailChange } = changes;
    if (this.paintingDetail && paintingDetailChange) {
      this.setArtist(this.paintingDetail);
    }
  }

  setArtist(artist: PaintingDetailArtist): void {
    this.setKey('name', artist.name);
    this.setKey('surname', artist.surname);
  }

  setKey(key: string, value: string): void {
    this.copyPaintingDetailArtist = {
      ...this.copyPaintingDetailArtist,
      [key]: value,
    };
  }

  onEditArtist(): void {
    const { name, surname } = this.copyPaintingDetailArtist;
    const data = {
      artist: {
        name: name,
        surname: surname,
      },
    };
    this.editArtist.emit(data);
  }
}
