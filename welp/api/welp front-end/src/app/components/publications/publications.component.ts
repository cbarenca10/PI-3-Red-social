import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
//import { $ } from 'protractor';
//import * as $ from 'jquery';



@Component({
    selector: 'publications',
    templateUrl: './publications.component.html',
    providers: [UserService, PublicationService]
}) 

export class PublicationsComponent implements OnInit{
    public title: string;
    public indentity;
    public token;
    public url: string;
    public status: string;
    public page;
    public total;
    public pages;
    public itemsPerPage;
    public publications: Publication[];
    public stats;
    public publication: Publication;
    @Input() user: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService        
    ){
        this.title = 'Publications';
        this.indentity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
        this.stats = this._userService.getStats();
        this.publication = new Publication("","","","",this.indentity._id);
    }

    ngOnInit(){
        console.log('publications.component cargado correctamente');
        this.getPublications(this.user, this.page);
        console.log("sidebar.component ha sido cargado");
    }
    
    getPublications(page,user ,adding= false){
        this._publicationService.getPublicationsUser(this.token,user,page).subscribe(
            response => {
                if(response.publications){
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage = response.items_per_page;
                    
                    if(!adding){
                        this.publications = response.publications;
                    }else{
                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB); 

                        $("html, body").animate({scrollTop:$("html").prop("scrollHeight")},500);
                    }

                    if(page > this.pages){
                        //this._router.navigate(['/home']);
                    }
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
    public noMore = false;
    viewMore(){
        this.page +=1;

        if(this.page == this.pages){
            this.noMore = true;
        }
        this.getPublications(this.user,this.page, true);
    }
    
}
