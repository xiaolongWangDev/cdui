import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/introduction">Configuration-Driven Demos</a>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <div ngbDropdown class="dropdown">
              <button ngbDropdownToggle class="btn btn-info" type="button" id="obsSafetyDemoDropdownBtn"
                      aria-expanded="false">
                Observable
              </button>
              <ul ngbDropdownMenu aria-labelledby="obsSafetyDemoDropdownBtn">
                <li><a ngbDropdownItem routerLink="/demo_obs_created_by_ancestor" routerLinkActive="active">Created By
                  Ancestor</a></li>
                <li><a ngbDropdownItem routerLink="/demo_obs_created_by_non_ancestor" routerLinkActive="active">Created
                  By Non Ancestor</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
