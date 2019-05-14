import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-example-searchable-list',
  templateUrl: './example-searchable-list.component.html',
  styleUrls: ['./example-searchable-list.component.less']
})
export class ExampleSearchableListComponent implements OnInit {
  filteredField = 'name';
  users = [
    {
      id: '1',
      name: 'Caroline Hodges'
    },
    {
      id: '2',
      name: 'Delores Rivas'
    },
    {
      id: '3',
      name: 'Darlene Franklin'
    },
    {
      id: '4',
      name: 'Alfreda Love'
    },
    {
      id: '5',
      name: 'Marcy Ratliff'
    },
    {
      id: '6',
      name: 'Beulah Nielsen'
    },
    {
      id: '7',
      name: 'Morton Kerr'
    },
    {
      id: '8',
      name: 'Autumn Tillman'
    },
  ];

  @ViewChild('input') input?: ElementRef;
  observer$ = new Subject<KeyboardEvent>();
  currentValue = '';

  ngOnInit(): void {
  }

  onKeydown(event: KeyboardEvent): void {
    this.observer$.next(event);
  }

  handleCustomClick(event: string): void {
    this.currentValue = this.users[this.users.findIndex(item => item.id === event)].name;
  }
}
