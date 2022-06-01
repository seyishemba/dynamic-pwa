import { AppService } from '@app/app.service';
import { MenuService } from './menu.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    menu: Array<any> = [];
    @Input() collapse = true;
    @Output() menuCollapsed = new EventEmitter();
    constructor(private service: MenuService, private appService: AppService) {
        this.menu = service.menu;
        appService.collapseMenuSubject.subscribe((value) => {
            if (value) {
                this.collapseMenu();
            }
        });
     }

    ngOnInit(): void {
    }

    collapseMenu() {
        this.collapse = !this.collapse;
        this.menuCollapsed.emit(this.collapse);
    }
}
