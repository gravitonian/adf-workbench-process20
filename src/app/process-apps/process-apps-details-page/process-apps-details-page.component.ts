import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppsProcessService, CardViewItem, CardViewTextItemModel } from '@alfresco/adf-core';
import { AppDefinitionRepresentation } from 'alfresco-js-api';

@Component({
  selector: 'app-process-apps-details-page',
  templateUrl: './process-apps-details-page.component.html',
  styleUrls: ['./process-apps-details-page.component.scss']
})
export class ProcessAppsDetailsPageComponent implements OnInit {
  appDef: AppDefinitionRepresentation;
  properties: Array<CardViewItem>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private processAppService: AppsProcessService) {
    this.properties = new Array<CardViewItem>();
  }

  ngOnInit() {
    const appId: number = +this.activatedRoute.snapshot.params['process-app-id'];
    console.log('Showing app details for: ', appId);
    this.processAppService.getApplicationDetailsById(appId).subscribe(
      (appDef: AppDefinitionRepresentation) => {
        console.log('App details: ', appDef);
        this.appDef = appDef;
        this.setupProps(this.appDef);
      },
      (error) => {
        console.log('Error: ', error);
      });
  }

  private setupProps(appDef: AppDefinitionRepresentation) {
    console.log('setupProps: ', appDef.id);

    // Properties that are always available
    const idProp = new CardViewTextItemModel({label: 'Id:', value: appDef.id, key: 'appId'});
    const defaultAppIidProp = new CardViewTextItemModel({label: 'Default App Id:', value: appDef.defaultAppId, key: 'defaultAppId'});
    const tenantIdProp = new CardViewTextItemModel({label: 'Tenant Id:', value: appDef.tenantId, key: 'tenantId'});
    const deploymentIdProp = new CardViewTextItemModel({label: 'Deployment Id:', value: appDef.deploymentId, key: 'deploymentId'});
    const modelIdProp = new CardViewTextItemModel({label: 'Model Id:', value: appDef.modelId, key: 'modelId'});
    const nameProp = new CardViewTextItemModel({label: 'Name:', value: appDef.name, key: 'appName'});
    const descProp = new CardViewTextItemModel({label: 'Description:', value: appDef.description, key: 'appDesc'});
    const iconProp = new CardViewTextItemModel({label: 'Icon:', value: appDef.icon, key: 'appIcon'});

    this.properties.push(idProp);
    this.properties.push(defaultAppIidProp);
    this.properties.push(tenantIdProp);
    this.properties.push(deploymentIdProp);
    this.properties.push(modelIdProp);
    this.properties.push(nameProp);
    this.properties.push(descProp);
    this.properties.push(iconProp);
  }

  onGoBack($event: Event) {
    this.navigateBack2AppList();
  }

  private navigateBack2AppList() {
    this.router.navigate(['../'],
      {
        relativeTo: this.activatedRoute
      });
  }

  onShowProcDefs($event: Event) {
    console.log('Navigate to process definitions for app: ', this.appDef.id);

    this.router.navigate(['procdef-list'],
      {
        relativeTo: this.activatedRoute
      });
  }

  onStartProcess($event: Event) {
    console.log('Navigate to start process for app: ', this.appDef.id);

    this.router.navigate(['start-process'],
      {
        relativeTo: this.activatedRoute
      });
  }
}
