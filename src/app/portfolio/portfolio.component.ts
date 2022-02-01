import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InterfaceService } from '../interface.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent  {
  page=0;
  profilepic!:any;
  coverpic!:any;
  skills:string[]=[];
  skillmap={};
  project:any[]=[]
  traits:string[]=[];
  hobbies:string[]=[];
 
  text1!:string;
  text2!:string;
  text3!:string;
  text4!:string;
  text5!:string;
  text6!:string;
  text7!:string;
  // value!:number;
  @ViewChild("image1") im1!:ElementRef;
  @ViewChild("image2") im2!:ElementRef;
  constructor(private is:InterfaceService,public router:Router) { }
  
 

  getBase(choice:number)
  {
    let file:any;
    if(choice==0)
    {
        file=this.im1.nativeElement.files[0];
    }
    else{
      file=this.im2.nativeElement.files[0];
    }
    var reader =new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      if(choice==0)
      {
        this.profilepic=reader.result;
        console.log(this.profilepic);
      }
      else
      {
        this.coverpic=reader.result;
        console.log(this.coverpic);
      }
    }, false);
    reader.onerror=function ()
    {
      console.log(reader.error);
    }
  }
  
  prev()
  {
    
    if(this.page>0){
    this.page=this.page-1;
    }
  }
  next()
  {
    if(this.page<4)
    {
      this.page=this.page+1;
    }
  }

  addskill(a:string,b:string)
  {
    let flag=0;
    a=a.toLowerCase()
    for (let skill of this.skills)
    {
      if(skill==a)
      {
        flag=1;
        break
      }
    }
    if(flag==0)
    {
      this.skills.push(a);
    (this.skillmap as any)[a]=parseInt(b);
    console.log(this.skillmap);
    }
    
  }

  addproject()
  {
    let flag=0;
    this.text3=this.text3.toLowerCase();
    for (let pro of this.project)
    {
      if(pro.name==this.text3)
      {
        flag=1;
        break
      }
    }
    if(flag==0)
    {
    let a:any={};
    (a as any)["name"]=this.text3;
    // (a as any)["description"]=this.text4;
    (a as any)["link"]=this.text5;
    this.project.push(a);
    console.log(this.project);
    }
  }

  addpersonaltraits()
  {
    let flag=0;
    this.text6=this.text6.toLowerCase();
    for (let pt of this.traits)
    {
      if(pt==this.text6)
      {
        flag=1;
        break
      }
    }
    if(flag==0)
    {
      this.traits.push(this.text6);
    }
  }

  addhobbies()
  {
    let flag=0;
    this.text7=this.text7.toLowerCase();

    for (let hb of this.hobbies)
    {
      if(hb==this.text7)
      {
        flag=1;
        break
      }
    }
    if(flag==0)
    {
      this.hobbies.push(this.text7);
    }
  }

  adddata()
  {
    this.is.addportfoliodata({id:localStorage.getItem('id'),profilepic:this.profilepic,coverpic:this.coverpic,skills:this.skills,
      skillmap:this.skillmap,project:this.project,traits:this.traits,hobbies:this.hobbies}).subscribe(
        (b)=>{this.router.navigate(['/portfolio'])}
      )
  }
}
 