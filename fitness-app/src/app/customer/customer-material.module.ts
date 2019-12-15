import { NgModule } from "@angular/core";
import {
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule
} from '@angular/material';

const MODULE = [
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule
]

@NgModule({
    imports: MODULE,
    exports: MODULE
})
export class CustomerMaterialModule { }