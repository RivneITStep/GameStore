export class SignUpModel {
    public Email: string = "";
    public Password: string = "";
    public FullName: string = "";
    public PhoneNumber: string = "";

    isValid(): boolean {
        if (this.Email !== ''
            && this.FullName !== ''
            && this.PhoneNumber !== ''
            && this.Password !== '') {
            return true;
        } else {
            return false;
        }
    }

    isEmail(): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.Email).toLowerCase());
    }

}
