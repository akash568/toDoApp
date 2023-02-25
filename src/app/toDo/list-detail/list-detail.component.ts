import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List, processedFile } from '../models/todo.model';

/**
 * Component to show todo item details
 */
@Component({
  selector: 'td-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { list: List }) {}

  /**
   * 
   * @param file base64 file with name
   */
  downloadFile(file: processedFile) {
    const downloadLink = document.createElement('a');
    const fileName = file.name;

    downloadLink.href = file.result;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
