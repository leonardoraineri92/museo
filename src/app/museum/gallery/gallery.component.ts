import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataParams } from 'src/app/models/interface';
import { Nullish } from 'src/app/models/nullish';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
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
