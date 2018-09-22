import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CreatorComponent} from './creator/creator.component';
import {FormsModule} from '@angular/forms';
import {RovercontrollerComponent} from './rovercontroller/rovercontroller.component';
import {DiscovermassComponent} from './discovermass/discovermass.component';
import {DeveloperComponent} from './developer/developer.component';
import {RestfullService} from './service/restfull.service';
import {HttpModule} from '@angular/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FooterComponent} from './footer/footer.component';
import {FlashMessagesModule} from "angular2-flash-messages";
import {FlashMessagesService} from "angular2-flash-messages/module/flash-messages.service";

const applicationRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'creatrover', component: CreatorComponent},
    {path: 'controlrover', component: RovercontrollerComponent},
    {path: 'discovermass', component: DiscovermassComponent},
    {path: 'developerpage', component: DeveloperComponent},
];


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CreatorComponent,
        RovercontrollerComponent,
        DiscovermassComponent,
        DeveloperComponent,
        DashboardComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(applicationRoutes),
        HttpModule,
        FormsModule,
        FlashMessagesModule
    ],
    providers: [RestfullService,FlashMessagesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
