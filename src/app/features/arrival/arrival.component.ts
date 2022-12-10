import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/model/airline';
import { Airport } from 'src/app/model/airport';
import { Arrival } from 'src/app/model/arrival';
import { Status } from 'src/app/model/status';
import { AirlineService } from 'src/app/service/airline.service';
import { AirportService } from 'src/app/service/airport.service';
import { ArrivalService } from 'src/app/service/arrival.service';
import { StatusService } from 'src/app/service/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.css']
})
export class ArrivalComponent implements OnInit {

  // --- for 2-way data binding on input fields ---
  id: string = '';
  scheduled: Date | undefined;
  status: string = '';
  origin: string = '';
  revised: Date | undefined;
  airline: string = '';
  route: string = '';
  // ---

  arrival: Arrival; // for saving

  // --- for input fields ---
  statuses: Status[] | undefined;
  airports: Airport[] | undefined;
  airlines: Airline[] | undefined;
  arrivals: any[] | undefined;
  // ---

  constructor(
    private statusService: StatusService, 
    private airportService: AirportService,
    private airlineService: AirlineService,
    private arrivalService: ArrivalService,
    private router: Router
  ) {
    this.arrival = new Arrival();
  } 

  ngOnInit() {
    this.statusService.getArrivalStatuses().subscribe(data => {
      this.statuses = data._embedded.statuses;
    });

    this.airportService.findAll().subscribe(data => {
      this.airports = data._embedded.airports;
    });

    this.airlineService.findAll().subscribe(data => {
      this.airlines = data._embedded.airlines;
    });

    this.reloadArrivals();
  }

  reloadArrivals() {
    this.arrivalService.getByOrderByScheduledDesc().subscribe(data => {
      this.arrivals = data._embedded.arrivals;
    });
  }

  onSubmit() {
    this.arrival.id = this.id;
    this.arrival.scheduled = this.scheduled;
    this.arrival.status = 'http://localhost:8080/api/statuses/'+this.status;
    this.arrival.origin = 'http://localhost:8080/api/airlines/'+this.origin;
    this.arrival.revised = this.revised;
    this.arrival.airline = 'http://localhost:8080/api/airlines/'+this.airline;
    this.arrival.route = this.route;

    this.arrivalService.save(this.arrival).subscribe(result => this.refresh());

    this.clearForm();
  }

  refresh() {
    this.reloadArrivals();
  }

  editArrival(id: string) {
    this.arrivalService.getById(id).subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.scheduled = data.scheduled.slice(0, -13);
      this.status = data.status.id;
      this.origin = data.origin.code;
      if(data.revised != null)
        this.revised = data.revised.slice(0, -13);
      else
      this.revised = undefined;
      this.airline = data.airline.id;
      this.route = data.route;
    });
  }

  clearForm() {
    this.id = '';
    this.scheduled = undefined;
    this.status = '';
    this.origin = '';
    this.revised = undefined;
    this.airline = '';
    this.route = '';
  }

}
