
import { BrowserModule }    from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule }         from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//Third Party Modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule    } from '@swimlane/ngx-charts';
import { ClarityModule      } from '@clr/angular';

//Local App Modules
import { AppRoutingModule } from './app-routing.module';

// Directives
import { TrackScrollDirective } from './directives/track_scroll/track_scroll.directive';


// Components
import { BadgeComponent  } from './components/badge/badge.component';
import { LegendComponent } from './components/legend/legend.component';
import { LogoComponent   } from './components/logo/logo.component';

//Pages  -- Pages too are components, they contain other components
import { AppComponent }       from './app.component';
import { HomeComponent         } from './home.component';
import { LoginComponent        } from './pages/login/login.component';
import { LogoutComponent       } from './pages/logout/logout.component';
import { DashboardComponent    } from './pages/dashboard/dashboard.component';
import { OrderStatsComponent   } from './pages/order_stats/order_stats.component';
import { ProductStatsComponent } from './pages/product_stats/product_stats.component';
import { ProductsComponent     } from './pages/products/products.component';
import { CustomersComponent    } from './pages/customers/customers.component';
import { OrdersComponent       } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order_details/order_details.component';
// HEADER-ONLY FORM
import { InstructorComponent    } from './pages/instructor/instructor.component';
import { AllInstructorComponent    } from './pages/instructor/all/all-instructor.component';
import { AddInstructorComponent    } from './pages/instructor/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './pages/instructor/edit/edit-instructor.component';
import { ReadOnlyInstructorComponent } from './pages/instructor/read-only/readonly-instructor.component';

// HEADER-LINE FORM
import { UniversityComponent } from './pages/university/university.component';
import { AllTeacherComponent } from './pages/university/teacher/all/all-teacher.component';
import { AddTeacherComponent } from './pages/university/teacher/add/add-teacher.component';
import { EditTeacherComponent } from './pages/university/teacher/edit/edit-teacher.component';
import { ReadOnlyTeacherComponent } from './pages/university/teacher/read-only/readonly-teacher.component';
import { AllStudentComponent } from './pages/university/student/all/all-student.component';
import { AddStudentComponent } from './pages/university/student/add/add-student.component';
import { EditStudentComponent } from './pages/university/student/edit/edit-student.component';
import { ReadOnlyStudentComponent } from './pages/university/student/read-only/readonly-student.component';

// Services
import { AppConfig        } from './app-config';
import { UserInfoService  } from './services/user-info.service';
import { AuthGuard        } from './services/auth_guard.service';
import { ApiRequestService} from './services/api/api-request.service';
import { TranslateService } from './services/api/translate.service';
import { LoginService     } from './services/api/login.service';
import { OrderService     } from './services/api/order.service';
import { ProductService   } from './services/api/product.service';
import { CustomerService  } from './services/api/customer.service';
import { EmployeeService  } from './services/api/employee.service';
import { InstructorService } from './services/api/rn_instructor.service';
import { TeacherService } from './services/api/teacher.service';
import { StudentService } from './services/api/student.service';

import { ExtensionComponent } from './pages/extension/extension.component';
import { AllExtensionComponent } from './pages/extension/all-extension/all-extension.component';
import { EditExtensionComponent } from './pages/extension/edit-extension/edit-extension.component';
import { AddExtensionComponent } from './pages/extension/add-extension/add-extension.component';
import { ExtensionService } from './services/api/extension.service';
import { ReadOnlyExtensionComponent } from './pages/extension/read-only/readonly-extension.component';
import { UserRegistrationService } from './services/api/user-registration.service';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { SocialLoginComponent } from './pages/social-login/social-login.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { SignupComponent } from './pages/signup/signup.component';
import { AccountSetupComponent } from './pages/account-setup/account-setup.component';

import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';

import { UserProfileSettingsComponent } from './pages/user-profile-settings/user-profile-settings.component';
import { UserProfileService } from './services/api/user-profile.service';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { OrgUserService } from './services/api/org-user.service';
import { OrgUserComponent } from './pages/org-user/org-user.component';
import { AddOrgUserComponent } from './pages/org-user/add/add-org-user.component';
import { AllOrgUserComponent } from './pages/org-user/all/all-org-user.component';
import { ReadOnlyOrgUserComponent } from './pages/org-user/read-only/readonly-org-user.component';
import { EditOrgUserComponent } from './pages/org-user/edit/edit-org-user.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { FileEditorComponent } from './pages/file-editor/file-editor.component';
import { FileEditorService } from './services/api/file-editor.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TeacherAddExtensionComponent } from './pages/university/teacher/extensions/add-ext/teacher-add-extension.component';
import { TeacherReadonlyExtensionComponent } from './pages/university/teacher/extensions/readonly-ext/teacher-readonly-extension.component';
import { TeacherEditExtensionComponent } from './pages/university/teacher/extensions/edit-ext/teacher-edit-extension.component';
import { TeacherGridExtensionComponent } from './pages/university/teacher/extensions/grid-ext/teacher-grid-extension.component';
import { CodemirrorModule } from 'ng2-codemirror';
//import { CodemirrorModule } from '@nomadreservations/ngx-codemirror';
//import { ErrorInterceptor } from './services/error.interceptor';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Thirdparty Module
    NgxDatatableModule,
    NgxChartsModule,
    //ClarityModule.forChild(),
    ClarityModule,

    // Local App Modules
    AppRoutingModule,
    EditorModule, // tinymice
    //MonacoEditorModule.forRoot() // use forRoot() in main app module only.
    CodemirrorModule
  ],

  declarations: [
    // Components
    BadgeComponent,
    LegendComponent,
    LogoComponent,
    //Pages -- Pages too are components, they contain other components
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    ProductStatsComponent,
    OrderStatsComponent,
    ProductsComponent,
    //EmployeesComponent,

    CustomersComponent,
    OrdersComponent,
    OrderDetailsComponent,
    // instructor
    InstructorComponent,
    AllInstructorComponent,
    AddInstructorComponent,
    EditInstructorComponent,
    ReadOnlyInstructorComponent,
    // HEADER-LINE COMPONENTS
    UniversityComponent,
    AllTeacherComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    ReadOnlyTeacherComponent,
    AllStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    ReadOnlyStudentComponent,
    // extensions
    TeacherAddExtensionComponent,
    TeacherEditExtensionComponent,
    TeacherReadonlyExtensionComponent,
    TeacherGridExtensionComponent,

    //Directives
    TrackScrollDirective,
    // EXTENSION
    ExtensionComponent,
    AllExtensionComponent,
    EditExtensionComponent,
    AddExtensionComponent,
    ReadOnlyExtensionComponent,
   
    // user registration
    UserRegistrationComponent,
    SocialLoginComponent,
    SignupComponent,
    AccountSetupComponent,
    AlertComponent,
    UserProfileSettingsComponent,
    UserAccountComponent,
    // users by admin
    OrgUserComponent,
    AddOrgUserComponent,
    AllOrgUserComponent,
    ReadOnlyOrgUserComponent,
    EditOrgUserComponent,
    PasswordResetComponent,
    FileEditorComponent
  ],

  providers:[
    AuthGuard,
    UserInfoService,
    TranslateService,
    ApiRequestService,
    LoginService,
    //RealnetMenuService, // responsible for side nav
    OrderService,
    ProductService,
    CustomerService,
    EmployeeService,
    InstructorService,
    TeacherService,
    StudentService,
    AppConfig,
    ExtensionService,
    UserRegistrationService,
    AlertService,
    UserProfileService,
    OrgUserService,
    FileEditorService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
