import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radioButton';
import { SplitterModule } from 'primeng/splitter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService,MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    SplitterModule,
    ProgressSpinnerModule,
    MatSnackBarModule,
    ConfirmDialogModule,
    // ConfirmationService,
    // MessageService
  ],
})
export class MaterialModule {}
