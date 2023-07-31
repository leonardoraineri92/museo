import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValueForm } from 'src/app/models/interface';

@Component({
  selector: 'app-museum-filter',
  templateUrl: './museum-filter.component.html',
  styleUrls: ['./museum-filter.component.scss'],
})
export class MuseumFilterComponent {
  @Input() fillFilter: ValueForm = {
    artistsName: [],
    paintingsStatus: null,
    paintingsName: [],
  };

  @Output() valueForm = new EventEmitter<ValueForm>();

  artistsName: string[] = [];
  paintingsStatus: boolean | null = null;
  paintingsName: string[] = [];

  search(): void {
    let data: ValueForm = {
      artistsName: this.artistsName,
      paintingsStatus: this.paintingsStatus,
      paintingsName: this.paintingsName,
    };

    this.valueForm.emit(data);
  }

  resetSelect(): void {
    this.artistsName = [];
    this.paintingsStatus = null;
    this.paintingsName = [];
    this.search();
  }
}
