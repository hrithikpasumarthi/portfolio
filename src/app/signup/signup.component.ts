import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InterfaceService } from '../interface.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form!:FormGroup;
  constructor(private fb:FormBuilder, public router:Router, private is:InterfaceService) { }
  errormessage:string='';
  ngOnInit(): void {
    this.form=this.fb.group({
      id:['',[Validators.required,this.emailchecker]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]]
    });
    localStorage.removeItem('id');
    localStorage.removeItem('isloggedin');
  }

  emailchecker(c:FormControl)
  {
    let a=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(a.test(c.value))
    {
      return null;
    }
    else{
      return {pattern:"Invalid Email"}
    }
  }
 
  getdata()
  {
    this.is.getcredentials(this.form.value).subscribe((b)=>{
      if((b as any).password== this.form.value.password)
      {
        this.errormessage="";
        localStorage.setItem('isloggedin',"true");
        localStorage.setItem('id',(b as any).id);
        // this.router.navigate(['/dashboard']);
        this.router.navigate(['/portfolio']);
      }
      else{
        this.errormessage="Invalid Credentials";
        localStorage.setItem('isloggedin',"false");
        location.reload();
      }
    },(err)=>{this.errormessage="Invalid Credentials";localStorage.setItem('isloggedin',"false");
    location.reload();
  })
  }
}
