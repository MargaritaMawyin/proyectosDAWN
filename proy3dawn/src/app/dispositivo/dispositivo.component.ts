import { Component, OnInit } from '@angular/core';
var fuente:any;
@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.css']
})
export class DispositivoComponent implements OnInit {

    imagen():void{
    onclick =(event)=> {
    fuente=event.target
    console.log(fuente)
    
  }
    
  }
  
  constructor() { }

  ngOnInit(): void {   
  }

}
// export default DispositivoComponent;
export default fuente;

