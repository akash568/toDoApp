import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FormService } from '../../services/form.service';
import { List, processedFile } from '../models/todo.model';
import { addList, updateList } from '../state/list.actions';
import { ListState } from '../state/list.state';
import { MatDialogRef } from '@angular/material/dialog';
import { getRandomColor } from '../../utility/color-randomizer';

/**
 * Add or update todo list
 */
@Component({
  selector: 'td-add-update-list',
  templateUrl: './add-update-list.component.html',
  styleUrls: ['./add-update-list.component.scss'],
})
export class AddUpdateListComponent implements OnInit {
  listForm!: FormGroup;

  files: processedFile[] = [];

  fileUpdated: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { noteType: number; list: List },
    private formService: FormService,
    private store: Store<ListState>,
    private dilogRef: MatDialogRef<AddUpdateListComponent>
  ) {}

  ngOnInit(): void {
    this.formGenerator();
    this.fileUpdater();
  }

  /*--------------------------------------------------------------------
    Private Methods
  --------------------------------------------------------------------*/

  /**
   * Generate form based on data
   *
   * @description It will generate controls based on types and update existing value if user is updating list
   */
  private formGenerator() {
    const { list } = this.data;
    const formDetail = [
      {
        key: 'note',
        value: !!list?.note ? list.note : '',
        required: true,
      },
      {
        key: 'dueDate',
        value: !!list?.dueDate ? list.dueDate : '',
        required: true,
      },
    ];
    this.listForm = this.formService.formGenerator(
      this.data.noteType <= 1 ? formDetail.slice(0, 1) : formDetail
    );
  }

  /**
   * updates local file variable after fecthing file details from store
   *  
   * @returns void
   */
  private fileUpdater() {
    if (!this.data.list?.file) {
      return;
    }

    this.files = JSON.parse(JSON.stringify(this.data.list.file));
  }

  /**
   * Close current popup
   */
  private closeDialog() {
    this.dilogRef.close();
  }

  /**
   * Dispatches an action to add item into list based on given value
   */
  private addIntoList() {
    this.store.dispatch(
      addList({
        list: {
          ...this.listForm.value,
          creationDate: new Date().toJSON(),
          color: getRandomColor(),
          type: this.data.noteType,
          file: this.files,
        },
      })
    );
  }

  /**
   * Dispatch updateList action to update list based on given value
   */
  private updateIntoList() {
    this.store.dispatch(
      updateList({
        list: {
          ...this.data.list,
          ...this.listForm.value,
          file: this.files,
        },
      })
    );
  }

  /**
   * Converts FileList into base64 files
   * 
   * @param file FileList object contains files details
   * @returns {Promise<processedFile[]>} base64 converted files
   */
  private toBase64(file: FileList): Promise<processedFile[]> {
    return new Promise<processedFile[]>((resolve, reject) => {
      const processedFile: processedFile[] = [];
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(file.item(i)!);
        reader.onload = () => {
          processedFile.push({
            name: file.item(i)!.name,
            result: reader.result as string,
          });
          if (file.length === processedFile.length) {
            resolve(processedFile);
          }
        };
        reader.onerror = (error) => reject(error);
      }
    });
  }

  /*--------------------------------------------------------------------
    Public Methods
  --------------------------------------------------------------------*/
  /**
   * On form submit Update or add new item in to do List
   *
   * @remarks This will call API only if user updated data in form
   * @returns {void} Void
   */
  public submitToList(): void {
    if (this.listForm.invalid || this.data.noteType === 3 && this.files.length === 0) {
      return;
    }

    if (
      (this.listForm.pristine &&
        this.fileUpdated === false &&
        this.data.list.type === 3) ||
      (this.listForm.pristine && this.data.list.type !== 3)
    ) {
      this.closeDialog();
    } else {
      if (!!this.data?.list) {
        this.updateIntoList();
      } else {
        this.addIntoList();
      }
      this.closeDialog();
    }
  }

  /**
   * Add proccessed file into files variable
   * 
   * @param fileRef File input refrence
   * @returns void
   */
  public async addFile(fileRef: HTMLInputElement) {
    const { files } = fileRef;
    if (!files) {
      return;
    }

    this.fileUpdated = true;
    this.files = [...this.files, ...(await this.toBase64(files))];
    fileRef.value = '';
  }

  /**
   * Removes file from local files variable
   * 
   * @param index delete index
   * @param fileRef File inpur refrence
   */
  public async removeFile(index: number, fileRef: HTMLInputElement) {
    this.files.splice(index, 1);
    this.fileUpdated = true;

    if (this.files.length === 0) {
      fileRef.value = '';
    }
  }
}
