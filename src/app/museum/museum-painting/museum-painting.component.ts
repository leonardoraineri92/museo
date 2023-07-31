import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataParams } from 'src/app/models/interface';
import { Nullish } from 'src/app/models/nullish';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-museum-painting',
  templateUrl: './museum-painting.component.html',
  styleUrls: ['./museum-painting.component.scss'],
})
export class MuseumPaintingComponent {
  @Input() data: Nullish<Painting[]>;
  @Output() buystatus = new EventEmitter();
  @Output() editArtist = new EventEmitter();

  onBuyStatus(idPainting: number): void {
    this.buystatus.emit({ painting: { idPainting } });
  }

  onEditArtist(event: { artist: DataParams }, idPainting: number): void {
    this.editArtist.emit({ ...event, painting: { idPainting } });
  }
}
