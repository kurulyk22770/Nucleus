import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserAppService from '../../../services/user-app-service';
import swal from 'sweetalert2';

@Component
export default class UserListComponent extends Vue {
    public pagedListOfUserListDto: IPagedList<IUserListInput> = {
        totalCount: 0,
        items: [],
    };
    public userAppService = new UserAppService();

    public mounted() {
        this.getUsers();
    }

    public getUsers() {
        const userListInput: IUserListInput = {
            filter: '',
        };

        this.userAppService.getUsers(userListInput).then((response) => {
            this.pagedListOfUserListDto = response.content as IPagedList<IUserListInput>;
        });
    }

    public delete(id: string) {
        swal({
            title: 'Are you sure want to delete?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.value) {
                this.userAppService.deleteUser(id).then((response) => {
                    if (!response.isError) {
                        swal({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            type: 'success',
                            title: 'Successfully deleted!'
                        });
                        this.getUsers();
                    } else {
                        swal({
                            title: response.errors.join('<br>'),
                            type: 'error',
                            showConfirmButton: false,
                        });
                    }
                });
            }
        });
    }
}
