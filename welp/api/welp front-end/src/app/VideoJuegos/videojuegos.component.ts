import { Component } from "@angular/core";

@Component({
    selector: 'videojuegos',
    templateUrl: './videojuegos.component.html'
})

export class VideojuegosComponent{
    public nombre:string;
    public mejor_juego:string;
    public mejor_juego_retro:string;
    public mostrar_retro:boolean;
    public color:string;
    public year:number;

    public videojuegos:Array<string> 

    constructor(){
        this.nombre = 'Video juegos 2020';
        this.mejor_juego = 'GTA 5';
        this.mejor_juego_retro = 'Super mario 69';
        this.mostrar_retro = true;
        this.color = "#666";
        this.year = 2020;
        this.videojuegos = [
            'Los simpson',
            'GTA 5',
            'Chun li ',
            'Tic-tock'
        ];
    }

}