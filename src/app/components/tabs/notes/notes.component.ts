import { Component, OnInit, Input } from '@angular/core';
import { InspectionsService } from 'app/services/inspections/inspections.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() inspectionId: any;
  notes:any;
  constructor(private Inspections: InspectionsService) { }

  ngOnInit(): void {
        this.getNotes()
  }

  getNotes() {
    console.log(this.inspectionId)
    this.Inspections.GetFormDatas(["Filter", '"'+this.inspectionId+'"']).subscribe(data => {
        console.log(data)
        this.notes = data;
        this.formatNoteData(data.items)
      }, err => {
    });
  }



  formatNoteData(data){
    this.notes = []
    data.forEach((value: any, index: any) => {
      console.log(value);

      var input = {
        "data" : JSON.parse(value.formData.data),
        "id":  value.formData.id
      }
      
      this.notes.push(input)
    });
    console.log(this.notes)
  }

}
