import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by">
      Created with ♥
      <b><a href="#" target="_blank">Ria Tracker </a></b> 2023
    </span>
    <div class="socials">
      <a
        href="https://github.com/AyubTouba/ria"
        target="_blank"
        class="ion ion-social-github"
      ></a>
    </div>
  `,
})
export class FooterComponent {}
