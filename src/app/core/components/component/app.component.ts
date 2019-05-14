import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
// import { AmountInputComponent } from '../../../form/input/components/amount-input/amount-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  users = [
    {
      id: '5b902934d965e7501f4e1c6f',
      name: 'Caroline Hodges'
    },
    {
      id: '5b9029348f7eed8b6f5f02db',
      name: 'Delores Rivas'
    },
    {
      id: '5b9029346f48c8407c64d0d5',
      name: 'Darlene Franklin'
    },
    {
      id: '5b9029341eff315fa87f9e21',
      name: 'Alfreda Love'
    },
    {
      id: '5b9029342e8917c6ccdb9865',
      name: 'Marcy Ratliff'
    },
    {
      id: '5b9029349dbb48013460e01f',
      name: 'Beulah Nielsen'
    },
    {
      id: '5b902934f4f1586e5e72d74a',
      name: 'Morton Kerr'
    },
    {
      id: '5b9029347918bb204bf7014e',
      name: 'Autumn Tillman'
    },
    {
      id: '5b902934b86f80e1fc60c626',
      name: 'Diane Bennett'
    },
    {
      id: '5b9029348999f59215020349',
      name: 'June Eaton'
    }
  ];

  peoples = [
    {
      name: 'Ibra',
      id: '0'
    },
    {
      name: 'Dima',
      id: '1'
    },
    {
      name: 'Toha',
      id: '2'
    },
    {
      name: 'Artem',
      id: '3'
    },
  ];

  phones = [
    {
      number: '12345',
      id: '0'
    },
    {
      number: '54321',
      id: '1'
    },
    {
      number: '11111',
      id: '2'
    },
    {
      number: '22222',
      id: '3'
    },
  ];
}
