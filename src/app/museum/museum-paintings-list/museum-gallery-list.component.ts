import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataParams } from 'src/app/models/interface';
import { Nullish } from 'src/app/models/nullish';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-museum-paintings-list',
  templateUrl: './museum-gallery-list.component.html',
  styleUrls: ['./museum-gallery-list.component.scss'],
})
export class MuseumPaintingListComponent {
  @Input() data: Nullish<Painting[]>;
  @Output() buystatus = new EventEmitter();
  @Output() editArtist = new EventEmitter();

  onBuyStatus(event: DataParams): void {
    this.buystatus.emit(event);
  }
  onEditArtist(event: DataParams): void {
    this.editArtist.emit(event);
  }
}
