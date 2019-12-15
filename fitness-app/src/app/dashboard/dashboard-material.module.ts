import { NgModule } from "@angular/core";
import {
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule
} from '@angular/material';

const MODULE = [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule
]

@NgModule({
    imports: MODULE,
    exports: MODULE
})
export class DashboardMaterialModule { }