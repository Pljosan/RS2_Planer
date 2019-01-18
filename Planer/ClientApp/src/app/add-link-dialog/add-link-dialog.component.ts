import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-add-link-dialog',
  templateUrl: './add-link-dialog.component.html'
})
export class AddLinkDialogComponent implements OnInit {
    public form: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddLinkDialogComponent>) { 
        this.form = this.fb.group({
            'Url': ['', [Validators.required, this.urlValidator]]
         });
    }

    save() {
        this.dialogRef.close({"form": this.form.value});
    }

    close() {
        this.dialogRef.close();
    }

    ngOnInit() {}

    public urlValidator(url): any {
        if (url.pristine) {
           return null;
        }
        const URL_REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        url.markAsTouched();
        if (URL_REGEXP.test(url.value)) {
            return {
                invalidUrl: false
            };
        }
        return {
           invalidUrl: true
        };
     }
}