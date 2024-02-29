import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  slots: string[] = ['slot-01', 'slot-02', 'slot-03', 'slot-04', 'slot-05', 'slot-06',];

  constructor() { }

  ngOnInit(): void {
  }

}
