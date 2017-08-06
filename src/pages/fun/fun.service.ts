import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http"
import { Location } from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Injectable()
export class FunService{
    isLogined:boolean = false;
    funs: Array < any > = [];

 http:Http
    constructor(http:Http,private location:Location){
        this.http = http
    }
    delete(obj){
        this.deleteFunById(obj.objectId).subscribe(
             (value:any)=>{
                alert("success");
            },
            (error:any)=>{
                alert("error");
            },
            ()=>{
            this.location.go("/fun")
            }
        )
    }
    search(type,value){
        this.funs.sort((a,b)=>{
        let result1 = String(a[type]).match(value)
        let result2 = String(b[type]).match(value)

        return Number(result2)-Number(result1);
        });
    }
    deleteChecked(){
        let checkList = this.funs.filter(item=>item.check==true)
        checkList.forEach(item=>{
            this.delete(item)
        })
    }

    getFuns():Observable<any[]>{
        // 1. 拼接HTTP请求所需的URL和Headers
        let serverURL = "http://host.qh-class.com:2337/parse"
        let path = "/classes/"
        let className = "Fun"
        let url = serverURL+path+className

        let headers:Headers = new Headers({
            "X-Parse-Application-Id":"dev",
            "X-Parse-Master-Key":"angulardev",
            // "X-Parse-Session-Token":"r:059bbbebdc201de090f16fe9716b43bf",
            "Content-Type":"application/json; charset=utf-8"
        })

        // 2. 发起HTTP GET查询请求
        return this.http.get(url,{ headers:headers })
        .map(data=>data.json())
        .map(data=>data.results)        
    }
    deleteFunById(objectId):Observable<any>{
            // 1. 拼接HTTP请求所需的URL和Headers
            let serverURL = "http://host.qh-class.com:2337/parse"
            let path = "/classes/"
            let className = "Fun"
            let url = serverURL+path+className+"/"+objectId
            let headers:Headers = new Headers({
                "X-Parse-Application-Id":"dev",
                "X-Parse-Master-Key":"angulardev",
                // "X-Parse-Session-Token":"r:059bbbebdc201de090f16fe9716b43bf",
                "Content-Type":"application/json; charset=utf-8"
            })

            // 2. 发起HTTP DELETE查询请求
            return this.http.delete(url,{ headers:headers })
            .map(data=>data.json())
        }
    getFunById(objectId):Observable<any>{
        // 1. 拼接HTTP请求所需的URL和Headers
        let serverURL = "http://host.qh-class.com:2337/parse"
        let path = "/classes/"
        let className = "Fun"
        let url = serverURL+path+className+"/"+objectId

        let headers:Headers = new Headers({
            "X-Parse-Application-Id":"dev",
            "X-Parse-Master-Key":"angulardev",
            // "X-Parse-Session-Token":"r:059bbbebdc201de090f16fe9716b43bf",
            "Content-Type":"application/json; charset=utf-8"
        })
        // 2. 发起HTTP GET查询请求
        return this.http.get(url,{ headers:headers })
        .map(data=>data.json())
    }

    saveFun(body?):Observable<any[]>{
        // 1. 拼接HTTP请求所需的URL和Headers
        let serverURL = "http://host.qh-class.com:2337/parse"
        let path = "/classes/"
        let className = "Fun"
        let url = serverURL+path+className

        let headers:Headers = new Headers({
            "X-Parse-Application-Id":"dev",
            "X-Parse-Master-Key":"angulardev",
            // "X-Parse-Session-Token":"r:059bbbebdc201de090f16fe9716b43bf",
            "Content-Type":"application/json; charset=utf-8"
        })

        // 2. 发起HTTP POST或PUT提交请求
        // if(!body){
        //     body = {name:"666777",project:"ryanemax/ng-admin",exam1:66}
        // }
        if(body.objectId){
            url += "/"+body.objectId
            // body.objectId = undefined
            return this.http.put(url,{
                funname:body.funname,
                price:body.price,
                raise:body.raise,
                zongshou:body.zongshou,
            },{ headers:headers })
            .map(data=> data.json())
        }else{
            return this.http.post(url,body,{ headers:headers })
            .map(data=> data.json())
        }

    }

}


