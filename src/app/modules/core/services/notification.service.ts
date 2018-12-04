import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
    constructor(private toastr: ToastrService) { }

    success(htmlText: string)  {
        this.showNotification(NotificationEnum.success, htmlText);
    }

    info(htmlText: string)  {
        this.showNotification(NotificationEnum.info, htmlText);
    }

    primary(htmlText: string)  {
        this.showNotification(NotificationEnum.primary, htmlText);
    }

    warning(htmlText: string)  {
        this.showNotification(NotificationEnum.warning, htmlText);
    }

    danger(htmlText: string)  {
        this.showNotification(NotificationEnum.danger, htmlText);
    }

    private showNotification(notificationEnum: NotificationEnum, htmlText: string)  {
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>'+ htmlText, '', {
            timeOut: 8000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-"+ notificationEnum +" alert-with-icon",
            positionClass: 'toast-top-right'
          });
    }
}

export enum NotificationEnum {
    info,
    success,
    primary,
    warning,
    danger,
}