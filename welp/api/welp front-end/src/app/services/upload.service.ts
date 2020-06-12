import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
//import { FORMERR } from 'dns';

@Injectable()

export class UploadService{ 
     public url: String;

     constructor(){
         this.url = GLOBAL.url;
     }

     makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: String){
         return new Promise(function(resolve, reject){
             var formData: any = new FormData();
             var xhr = new XMLHttpRequest();

             for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
             }

             xhr.onreadystatechange = function(){
                 if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                 }
             }

             xhr.open('POST', url, true);
             xhr.setRequestHeader('Authorization', token);
             xhr.send(formData);
        });
     }
} 