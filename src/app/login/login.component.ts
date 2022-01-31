import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InterfaceService } from '../interface.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  repassword!:string;
  form!:FormGroup;
  constructor(private fb:FormBuilder,public router:Router, private is:InterfaceService) { }
  errormessage:string='';
  
  ngOnInit(): void {
    this.form=this.fb.group({
      name:['',[Validators.required]],
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

  adddata()
  {
    this.is.addcredentials(this.form.value).subscribe((b)=>{this.errormessage='';
    localStorage.setItem('isloggedin',"true");
    localStorage.setItem('id',(b as any).id);
    this.router.navigate(['/dashboard'])},
    (err)=>{if(err.error.slice(7,35).trim()=="Insert failed, duplicate id")
  {
    this.errormessage="*Email id already exists";
    localStorage.setItem('isloggedin',"false");
    location.reload();
  }});
  }
}
