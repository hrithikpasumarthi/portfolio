import { Component, OnInit, ViewChild } from '@angular/core';
import { InterfaceService } from '../interface.service';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  data!:any;
  ok=false;
  start=0;
  end=3;
  maxlength!:number;
  stararray:boolean[]=[];
  star!:number[];
  constructor(private is:InterfaceService,private el:ElementRef, public router:Router) { }

  ngOnInit(): void {
    this.is.getportfoliodata(localStorage.getItem('id')).subscribe((b)=>{this.data=b},(err)=>{},()=>{this.create()});
    // this.im1=this.data.profilepic;
    
  }
  @ViewChild("image1") im1!:ElementRef;
  @ViewChild("image2") im2!:ElementRef;

  create()
  {
    this.im1.nativeElement.src=this.data.profilepic;
    this.im2.nativeElement.src=this.data.coverpic;
    console.log(this.data.project.length);
    for (let i=0;i<this.data.skills.length;i++)
    {
      this.stararray.push(false);
    }
    this.ok=true;
    this.maxlength=this.data.project.length;
    
  }

  open(a:string)
  {
    location.href=a;
  }

  prev()
  {
    if(this.start>=3)
    {
    this.start=this.start-3;
    this.end=this.end-3;
    }
  }

  next()
  {
    if(this.end<=this.maxlength && this.maxlength!=3)
    {

      this.start=this.start+3;
      this.end=this.end+3;
    }
  }

  counter(i:any):number[]
  {
    console.log('hi');
    i=parseInt(i);
    if(i>5)
    {
      i=5;
    }
    else if (i<0)
    {
      i=0;
    }
   let arr=[];
   for (let j=0;j<i;j++)
   {
     arr.push(1);
   }
   for(let j=0;j<5-i;j++)
   {
     arr.push(0);
   }
   return [...arr];
  }

  logout()
  {
    localStorage.removeItem('id');
    localStorage.removeItem('isloggedin');
    this.router.navigate(['/login']);
  }
}
