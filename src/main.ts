import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../src/app/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from '../src/app/components/body/body.component';
import { TabletaskComponent } from '../src/app/components/tabletask/tabletask.component';
import { GraficoComponent } from '../src/app/components/grafico/grafico.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, InMemoryWebApiModule.forRoot(InMemoryDataService)),
    importProvidersFrom(BodyComponent, TabletaskComponent, GraficoComponent)
  ]
});

