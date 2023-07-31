import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gallery } from 'src/app/models/gallery';
import { DataParams } from 'src/app/models/interface';
import { Nullish } from 'src/app/models/nullish';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss'],
})
export class GalleriesListComponent {
  @Input() data: Nullish<Gallery[]>;
  @Output() buystatus = new EventEmitter();
  @Output() editArtist = new EventEmitter();

  onBuyStatus(data: DataParams, idGallery: number): void {
    this.buystatus.emit({ ...data, gallery: { idGallery } });
  }
  onEditArtist(data: DataParams, idGallery: number): void {
    this.editArtist.emit({ ...data, gallery: { idGallery } });
  }
}
