import { Router, ActivatedRoute, Params } from '@angular/router';
import {Component, OnInit, DoCheck, EventEmitter,Input,Output} from "@angular/core";
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Publication} from '../../models/publication';
import {PublicationService} from '../../services/publication.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService]
})

export class SidebarComponent implements OnInit, DoCheck{
    public indentity;
    public token;
    public stats;
    public url;
    public status;
    public publication: Publication;


    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router,
    ){
        this.indentity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication("","","","",this.indentity._id);
    }

    ngOnInit(){
        console.log("sidebar.component ha sido cargado");
    }

    ngDoCheck(){
        this.indentity = this._userService.getIdentity();
      }

    onSubmit(form){
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if(response.publication){
                    //this.publication = response.publication;
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/timeline']);
                }else{
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }
        //Output
        @Output() sended = new EventEmitter();
        sendPublication(event){
            this.sended.emit({send:'true'});
        }
}