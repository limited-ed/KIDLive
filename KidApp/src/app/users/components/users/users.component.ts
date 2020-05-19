import { OnInit, Input } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { User, Division, UserEditResult, } from 'models';
import { MessageBusService, DivisionService} from 'core';
import { UsersService } from 'core';
import { UserDialogComponent } from './../user-dialog/user-dialog.component';
import {  Observable, forkJoin } from 'rxjs';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';


@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    @ViewChild(UserDialogComponent) editUserDlg: UserDialogComponent;
    @ViewChild(PasswordDialogComponent) editPassDlg: PasswordDialogComponent;
    @ViewChild(DeleteDialogComponent) deleteDlg: DeleteDialogComponent;
    /** admin ctor */

    users: User[] = [];
    divisions: Division[] = [];

    showEdit = false;

    editUserSubscription: Observable<UserEditResult>;


    constructor(private service: UsersService, private dService: DivisionService, private messageBus: MessageBusService) {
    }

    ngOnInit(): void {
        this.messageBus.sendMessage('isLoading', true);
        forkJoin([
          this.service.getAll(),
          this.dService.getAll()
        ]).subscribe( ([users, divisions]) => {
                this.messageBus.sendMessage('isLoading', false);
                this.users = users;
                this.divisions = divisions;
            }, error => {
                this.messageBus.sendMessage('error', 'Произошла ошибка во время загрузки данных');
        });
    }

    onNew() {
      this.editUserDlg.showModal({
        id: 0,
        userName: '',
        login: '',
        roleId: 1,
        divisionId: 1,
      } as User, this.divisions);
    }

    onEdit(user: User) {
      this.editUserDlg.showModal(user, this.divisions);
    }

    saveUserToSrv(result: UserEditResult) {
      if (result.ok) {
        if (result.user.id > 0) {
          this.service.edit(result.user).subscribe( ok => {
              let index = this.users.findIndex( f => f.id === result.user.id);
              this.users[index] = result.user;
            }, error => {
              this.messageBus.sendMessage('error', 'Произошла ошибка во время сохранения данных');
            }
          );
        } else {
          this.service.add(result.user).subscribe( ok => {
              this.users.push( ok );
            }, error => {
              this.messageBus.sendMessage('error', 'Произошла ошибка во время сохранения данных');
            }
          );
        }
      }
    }

    onChangePassword(user: User) {
      this.editPassDlg.showModal(user);
    }

    onDelete(user: User) {
      this.deleteDlg.showModal(user);
    }

    deleteFromSrv(result: UserEditResult) {
      if (result.ok) {
        this.service.delete(result.user.id).subscribe ( ok => {
          let index = this.users.findIndex(f => f.id === result.user.id);
          this.users.splice(index, 1);
        }, error => {
          this.messageBus.sendMessage('error', 'Произошла ошибка во время сохранения данных');
        });
      }
    }

}

