import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuseumPageComponent } from './museum-page/museum-page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MuseumPaintingListComponent } from './museum-paintings-list/museum-gallery-list.component';
import { MuseumPaintingComponent } from './museum-painting/museum-painting.component';
import { GalleriesListComponent } from './galleries-list/galleries-list.component';
import { MuseoService } from './service/museo.service';
import { MuseumFormComponent } from './museum-form/museum-form.component';
import { FormsModule } from '@angular/forms';
import { MuseumFilterComponent } from './museum-filter/museum-filter.component';



@NgModule({
  declarations: [
    MuseumPageComponent,
    GalleryComponent,
    MuseumPaintingListComponent,
    MuseumPaintingComponent,
    GalleriesListComponent,
    MuseumFormComponent,
    MuseumFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[MuseumPageComponent],
  providers:[MuseoService]
})
export class MuseumModule { }
