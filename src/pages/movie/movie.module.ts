import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Child Page Components
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';

// Import Shared Module
import { PipesModule } from '../../pipes/pipes.module'
import { DirectivesModule } from '../../directives/directives.module'

// Providers
import { MovieService } from './movie.service'

// DataTable Depand CDK Table
import {CdkTableModule} from '@angular/cdk';
import {MdTableModule} from '@angular/material';
// End of DataTable

@NgModule({
  imports: [
     // Import Official Shared Module
    CommonModule,
    FormsModule,
    MaterialModule,
    // DataTable
    CdkTableModule,
    MdTableModule,
    // Import Custom Shared Module
    PipesModule,
    DirectivesModule,
    // Config Router
    RouterModule.forChild([
      { path: '', component: MovieListComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: MovieEditComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [
   MovieListComponent,
   MovieItemComponent, 
   MovieEditComponent,
   ],
   providers:[MovieService]
})
export class MovieModule { }
