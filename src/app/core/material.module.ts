import { NgModule } from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatLineModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";


const modules = [
  MatButtonModule,
  MatListModule,
  MatSliderModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatLineModule,
  MatListModule,
  MatFormFieldModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
