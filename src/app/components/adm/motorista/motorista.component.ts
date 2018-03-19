import { Component, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toast } from 'angular2-materialize';

/** Models */
import { Motorista } from '../../../models/motorista.model'

/** Services */
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DriverVanService } from '../../../services/driver-van.service';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.scss'],
  providers: [
    DriverVanService,
    Ng4LoadingSpinnerService
  ]
})
export class MotoristaComponent implements OnInit {
  public motoristas: Array<Motorista> = [];
  public loading: any = false;
  public loadingText: string = '';
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private spinnerService: Ng4LoadingSpinnerService,
    private driverVanService: DriverVanService 
    //private flashMessagesService: FlashMessagesService
  ) {

  }

  public ngOnInit() {
    this.listarMotoristas();
  }

  public listarMotoristas() {
    this.loadingText = 'Aguarde...';
    this.spinnerService.show();
    this.driverVanService.getAllDriverVan().subscribe(
      resp => {
        this.spinnerService.hide();
        if(resp['isSucceed']){
          this.motoristas = resp['data'];
        }
      },
      err => {
        this.spinnerService.hide();
        toast('<i class="material-icons">notifications</i>&nbsp;<span>Requisição Inválida!</span>'
          , 5000, 'orange darken-3');
      }
    )
  }
  
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
