import { Component, OnInit, Input } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-std101-std",
  templateUrl: "./std101.component.html",
  styleUrls: ["./std101.component.scss"]
})
export class Std101Component implements OnInit {
  @Input("route") route: any;
  public stepper: number = 0;
  public confirmForm101: any = null;
  public pageWaitting = false;
  public form101Confirm: FormGroup;

  constructor(public service: AppService, private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.pageWaitting = true;
    this.form101Confirm = this.formBuilder.group({
      username: [this.route.username],
      year: [this.service.yearOnSystem()],
      term: ["1"],
      formDoc: ["101"],
      remark: ["เอกสารถูกต้อง"],
      remark2: [""]
    });
    await this.getConfirm();
    this.pageWaitting = false;
  }

  private getConfirm = async () => {
    let formData = new FormData();
    formData.append("username", this.route.username);
    formData.append("year", this.service.yearOnSystem());
    formData.append("term", "1");
    formData.append("formDoc", "101");

    let http_confirm: any = await this.service.http.post(
      `student_confirm/get`,
      formData
    );

    if (http_confirm.rowCount > 0) {
      this.confirmForm101 = http_confirm.result[0];
    } else {
      this.confirmForm101 = null;
    }

    console.log("http_confirm_101", http_confirm);
  };

  public form101ConfirmSubmit = async () => {
    let confirm = await this.service.alert.confirm("ยืนยันการตรวจสอบเอกสาร");
    if (confirm) {
      let formData = new FormData();
      Object.keys(this.form101Confirm.value).forEach(i => {
        formData.append(i, this.form101Confirm.value[i]);
      });

      let http: any = await this.service.http.post(
        "/student_confirm/upremark",
        formData
      );
      console.log(http);
      await this.getConfirm();
    }
  };
}
