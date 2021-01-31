import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent  }       from './home.component';

import { LoginComponent        }   from './pages/login/login.component';
import { LogoutComponent       }   from './pages/logout/logout.component';
import { DashboardComponent    }   from './pages/dashboard/dashboard.component';
import { ProductStatsComponent }   from './pages/product_stats/product_stats.component';
import { OrderStatsComponent   }   from './pages/order_stats/order_stats.component';
import { ProductsComponent     }   from './pages/products/products.component';
import { CustomersComponent    }   from './pages/customers/customers.component';
import { OrdersComponent       }   from './pages/orders/orders.component';
import { OrderDetailsComponent }   from './pages/order_details/order_details.component';
//import { EmployeesComponent    }   from './pages/employees/employees.component';

import { AuthGuard } from './services/auth_guard.service';
import { PageNotFoundComponent }  from './pages/404/page-not-found.component';
import { InstructorComponent } from './pages/instructor/instructor.component';
import { AddInstructorComponent } from './pages/instructor/add-instructor/add-instructor.component';
import { ReadOnlyInstructorComponent } from './pages/instructor/read-only/readonly-instructor.component';
import { EditInstructorComponent } from './pages/instructor/edit/edit-instructor.component';
import { AllInstructorComponent } from './pages/instructor/all/all-instructor.component';

// HEADER LINE FORM
import { UniversityComponent } from './pages/university/university.component';
import { AllTeacherComponent } from './pages/university/teacher/all/all-teacher.component';
import { AddTeacherComponent } from './pages/university/teacher/add/add-teacher.component';
import { EditTeacherComponent } from './pages/university/teacher/edit/edit-teacher.component';
import { ReadOnlyTeacherComponent } from './pages/university/teacher/read-only/readonly-teacher.component';
import { ExtensionComponent } from './pages/extension/extension.component';
import { AllExtensionComponent } from './pages/extension/all-extension/all-extension.component';
import { AddExtensionComponent } from './pages/extension/add-extension/add-extension.component';
import { ReadOnlyExtensionComponent } from './pages/extension/read-only/readonly-extension.component';
import { EditExtensionComponent } from './pages/extension/edit-extension/edit-extension.component';
import { ForbiddenComponent } from './pages/403/forbidden.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { SocialLoginComponent } from './pages/social-login/social-login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AccountSetupComponent } from './pages/account-setup/account-setup.component';
import { UserProfileSettingsComponent } from './pages/user-profile-settings/user-profile-settings.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { AddOrgUserComponent } from './pages/org-user/add/add-org-user.component';
import { ReadOnlyOrgUserComponent } from './pages/org-user/read-only/readonly-org-user.component';
import { OrgUserComponent } from './pages/org-user/org-user.component';
import { EditOrgUserComponent } from './pages/org-user/edit/edit-org-user.component';
import { AllOrgUserComponent } from './pages/org-user/all/all-org-user.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { FileEditorComponent } from './pages/file-editor/file-editor.component';


export const routes: Routes = [
  //Important: The sequence of path is important as the router go over then in sequential manner
  { path: '', redirectTo: '/home/dashboard/order', pathMatch: 'full' },
  // { path: '', component: DashboardComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard],
    children:[  // Children paths are appended to the parent path
        { path: '', redirectTo: '/home/dashboard/order', pathMatch: 'full', data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}] },  // Default path (if no deep path is specified for home component like webui/home then it will by default show ProductsComponent )
        {
            path     : 'dashboard',
            component: DashboardComponent,
            data     : [{selectedHeaderItemIndex:0, selectedSubNavItemIndex:-1}],
            children :[
                { path: ''        , redirectTo: '/home/dashboard/order', pathMatch: 'full'},
                { path: 'order'   , component: OrderStatsComponent     , data:[{selectedHeaderItemIndex:0, selectedSubNavItemIndex:0}]  },
                { path: 'product' , component: ProductStatsComponent   , data:[{selectedHeaderItemIndex:0, selectedSubNavItemIndex:1}]  }
            ]
        },
        { path:'orders'    , component: OrdersComponent      , data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}]  },
        { path:'orders/:id', component: OrderDetailsComponent, data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}]  },
        { path:'products'  , component: ProductsComponent    , data:[{selectedHeaderItemIndex:2, selectedSubNavItemIndex:-1}]  },
        { path:'customers' , component: CustomersComponent   , data:[{selectedHeaderItemIndex:3, selectedSubNavItemIndex:-1}]  },
        //{ path:'employees' , component: EmployeesComponent   , data:[{selectedHeaderItemIndex:4, selectedSubNavItemIndex:-1}]  },
        
        // INSTRUCTOR
        { path:'instructors' , component: InstructorComponent, data:[{selectedHeaderItemIndex:5, selectedSubNavItemIndex:-1}],
          children : [
            { path: ''        , redirectTo: 'all', pathMatch: 'full'},
            { path: 'all'   , component: AllInstructorComponent    , data:[{selectedHeaderItemIndex:5, selectedSubNavItemIndex:-1}]  },
            { path: 'add'   , component: AddInstructorComponent     , data:[{selectedHeaderItemIndex:5, selectedSubNavItemIndex:-1}]  },
            { path: 'edit/:id'   , component: EditInstructorComponent     , data:[{selectedHeaderItemIndex:5, selectedSubNavItemIndex:-1}]  },
            { path: 'readonly/:id'   , component: ReadOnlyInstructorComponent    , data:[{selectedHeaderItemIndex:5, selectedSubNavItemIndex:-1}]  },
          ]  
       },
       // UNIVERSITY
       { path:'university' , component: UniversityComponent, data:[{selectedHeaderItemIndex:6, selectedSubNavItemIndex:-1}],
          children : [
            { path: ''        , redirectTo: 'all', pathMatch: 'full'},
            { path: 'all'   , component: AllTeacherComponent   , data:[{selectedHeaderItemIndex:6, selectedSubNavItemIndex:-1}]  },
            { path: 'add'   , component: AddTeacherComponent     , data:[{selectedHeaderItemIndex:6, selectedSubNavItemIndex:-1}]},
            { path: 'readonly/:h_id'   , component: ReadOnlyTeacherComponent    , data:[{selectedHeaderItemIndex:6, selectedSubNavItemIndex:-1}]},
            { path: 'edit/:h_id'   , component: EditTeacherComponent     , data:[{selectedHeaderItemIndex:6, selectedSubNavItemIndex:-1}]
              /* ,children : [
                { path: "", redirectTo: "all-line", pathMatch: 'full' },
                { path: "all-line", component: AllStudentComponent },
                { path: "add-line", component: AddStudentComponent },
                { path: "edit-line/:l_id", component: EditStudentComponent },
                { path: "line-details/:l_id", component: ReadOnlyStudentComponent }
              ] */
            },
          ] 
        },
        { path:'files' , component: FileEditorComponent },
        { path:'extension', component: ExtensionComponent, data:[{selectedHeaderItemIndex:7, selectedSubNavItemIndex:-1}],
          children : [
            { path: '', redirectTo: '/all', pathMatch: 'full'},
            { path: 'all'   , component: AllExtensionComponent, data:[{selectedHeaderItemIndex:7, selectedSubNavItemIndex:-1}] },
            { path: 'add'   , component: AddExtensionComponent, data:[{selectedHeaderItemIndex:7, selectedSubNavItemIndex:-1}] },
            { path: 'readonly/:id'   , component: ReadOnlyExtensionComponent, data:[{selectedHeaderItemIndex:7, selectedSubNavItemIndex:-1}] },
            { path: 'edit/:id'   , component: EditExtensionComponent, data:[{selectedHeaderItemIndex:7, selectedSubNavItemIndex:-1}] }
          ]
        },
        { path: 'profile-settings' , component: UserProfileSettingsComponent },
        { path: 'user-account' , component: UserAccountComponent },
        { path: 'reset-password' , component: PasswordResetComponent },

        // ORG-USERS START
        { path:'users' , component: OrgUserComponent,
          children : [
            { path: ''        , redirectTo: 'all', pathMatch: 'full'},
            { path: 'all'   , component: AllOrgUserComponent },
            { path: 'add'   , component: AddOrgUserComponent },
            { path: 'readonly/:id'   , component: ReadOnlyOrgUserComponent },
            { path: 'edit/:id'   , component: EditOrgUserComponent     },
          ] 
        },
         // ORG-USERS END

      ]
  },
  /* { // this will be real structure of profile settings 
    path: 'profile-settings',
    component: UserProfileSettingsComponent,
    canActivate:[AuthGuard],
    children:[  // Children paths are appended to the parent path
        { path: '', redirectTo: '/profile', pathMatch: 'full', data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}] }, 
        { path     : 'profile', component: ProfileComponent, data     : [{selectedHeaderItemIndex:0, selectedSubNavItemIndex:-1}]},
        { path: 'notifications'   , component: NotificationComponent     , data:[{selectedHeaderItemIndex:0, selectedSubNavItemIndex:0}]  },
        { path: 'accounts' , component: AccountsComponent   , data:[{selectedHeaderItemIndex:0, selectedSubNavItemIndex:1}]  }
    ]
  }, */
  //{ path: 'profile-settings' , component: UserProfileSettingsComponent , canActivate:[AuthGuard] },     
  //{ path: '', redirectTo: '/create-account', pathMatch: 'full' },
  { path: 'create-account' , component: UserRegistrationComponent , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },     
  { path: 'varify-account' , component: SocialLoginComponent , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },     
  { path: 'signup' , component: SignupComponent , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },     
  { path: 'account-setup' , component: AccountSetupComponent , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },     
  { path: 'login' , component: LoginComponent       , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },
  { path: 'logout', component: LogoutComponent      , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },
  { path: 'forbidden', component: ForbiddenComponent      , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },
  { path: '**'    , component: PageNotFoundComponent, data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash:true})], //{useHash:true}
  exports: [ RouterModule ],
  declarations:[PageNotFoundComponent, ForbiddenComponent]
})
export class AppRoutingModule {}
