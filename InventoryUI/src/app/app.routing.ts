import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent }  from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { InventoryComponent } from './features/inventory/inventory.component'
import { FeaturesComponent } from './features/features.component'
import { ReportsComponent } from './features/reports/reports.component'
export const AppRoutes: any = [
    {path: '' , component : DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path : 'register', component : RegisterComponent },
    //{ path : 'features', component : FeaturesComponent},
    { path : 'reports', component :ReportsComponent},
	{ path: 'features', component: FeaturesComponent, canActivate: [AuthGuard],
		children: [
		  { path: '', redirectTo: 'inventory', pathMatch: 'full' },
		  { path: 'inventory', component: InventoryComponent }
    ]
  }
];
export const appRoutingProviders: any[] = [];


export const AppComponents: any = [
    DashboardComponent,
    LoginComponent,
    RegisterComponent
];
