import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class TaskService implements OnInit {

    public rootObj;
    public activeTask;
    public tagsList;

    production = false


    constructor(private http: Http) {}

    public ngOnInit() {
        this.phpDataReturn().subscribe((data) => this.rootObj = data);
    }

    public getRootObject() {
        if(this.production) {
            this.phpDataReturn().subscribe((data) => this.rootObj = data);
            this.phpTagsListReturn().subscribe((data) => this.tagsList = data);
        } else {
            this.mockDataReturn().subscribe((data) => this.rootObj = data);
            this.mockTagsListReturn().subscribe((data) => this.tagsList = data);

        }
        
    }
    public saveRootObject() {
        let headerz = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headerz });
        console.log('before post json.php',this.rootObj)
        return this.http.post('json.php', JSON.stringify(this.rootObj), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        console.log(res)
        return res.json();
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private mockDataReturn() {
        return Observable.create((observer) => {
            observer.next({"meta":{"Daniel Test":"Needs to be built out"},"items":[{"id":69,"copy":"French consulate appointment","tags":[{"name":"Shopping List","color":"green"},"Important","For Cameron"]},{"id":1493521588445,"copy":"Dr appointment for Ritalin prescription","tags":["Important","For Cameron"]},{"id":1493521676811,"copy":"Buy new weatherproof jacket","tags":["Easy","Shopping List","Lunch Break"]},{"id":1493521901630,"copy":"Organise for TalkTalk benefits to be setup","tags":["Important"]},{"id":1493521944469,"copy":"Confirm that cover more claim has gone through","tags":["Weekend"]},{"id":1493521960984,"copy":"Look at places to move to near talktalk","tags":["Difficult","Weekend","For Cameron","Important"]},{"id":1493522070064,"copy":"Buy more thermals","tags":["Shopping List"]},{"id":1493522144976,"copy":"Get images for all the icons so you can tell quickly what main tags a task has","tags":["Personal Web Dev Proj"]},{"id":1493551594466,"copy":"build layout for 'search by tag' results & build manage tag pag so that input is large and styled","tags":["Personal Web Dev Proj"]},{"id":1493555794007,"copy":"Plan some weekend trips and set them aside to pick up at any time","tags":["Weekend"]},{"id":1493713281410,"copy":"Pay mum back the money she lent me","tags":[]},{"id":1493713484287,"copy":"Look into getting accountant for help with tax","tags":["Difficult","Weekend"]},{"id":1493714363543,"copy":"Go through the app and put catches in for incomplete code that could cause a crash","tags":["Personal Web Dev Proj"]},{"id":1493726128269,"copy":"Add the ability to delete tasks & add the ability to add and remove tags. Make sure tags are edited and removed relative to what tasks are currently using the tags","tags":["Personal Web Dev Proj"]},{"id":1493730752269,"copy":"figure out uk coins cos they shit","tags":["Easy","Weekend","Lunch Break"]}]});
            observer.complete();
        });
    }
    

    private mockTagsListReturn() {
        return Observable.create((observer) => {
            observer.next([{"name":"Easy"},{"name":"Difficult"},{"name":"Important"},{"name":"Shopping List"},{"name":"For Cameron"},{"name":"Weekend"},{"name":"Lunch Break"},{"name":"Personal Web Dev Proj"}]);
            observer.complete();
        });
    }

    private phpDataReturn() {
        return this.http.get('assets/data.json?nocache=' + (new Date()).getTime())
            .map(this.extractData)
            .catch(this.handleError);
    }
    private phpTagsListReturn() {
        console.log('getting tag list')
        return this.http.get('assets/tagsList.json?nocache=' + (new Date()).getTime())
            .map(this.extractData)
            .catch(this.handleError);
    }

    public updateTagsObject(updateObject){        
        console.log('update: '+updateObject)
        let headerz = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options = new RequestOptions({ headers: headerz });

        return this.http.post('tagsList.php', JSON.stringify(updateObject), options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public deleteToArchive(id){

        let items = this.rootObj.items;
        for(let i=0;i<items.length;i++){
            if(items[i].id === id) {
                let item = this.rootObj.items.splice(i,1)
                if(this.rootObj.archive === undefined){
                    this.rootObj.archive = [item]
                }else{
                    this.rootObj.archive.unshift(item)
                }
            }
        }  
        this.saveRootObject().subscribe(
            (success) => console.log(success),
            (error) => console.log(error));
    }
}
