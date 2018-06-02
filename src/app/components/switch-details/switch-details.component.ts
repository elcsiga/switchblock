import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as moment from 'moment';
import {SwitchService} from '../../services/switch/switch.service';

@Component({
  selector: 'app-switch-details',
  templateUrl: './switch-details.component.html',
  styleUrls: ['./switch-details.component.css']
})
export class SwitchDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<SwitchDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private switchService: SwitchService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatDate( date ) {
    return moment(date).format('LLLL');
  }

  toggleSwitch() {
    this.switchService.toggleSwitch(
      this.data.collectionId,
      this.data.switch.id
    );
  }
}
