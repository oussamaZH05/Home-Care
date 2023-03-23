import Swal from "sweetalert2/dist/sweetalert2.js";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
export function successAlert(message: string) {
  Swal.fire("Success!", message, "success");
}

export function errorAlert(message: string) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}
export function deleteAlert(message: string, func: any) {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your file has been deleted."
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary file is safe ",

          func
        );
      }
    });
}
export function aa() {
  Swal.fire({
    imageUrl: "https://placeholder.pics/svg/300x1500",
    imageHeight: 320,
    imageWidth: 450,
    imageAlt: "A tall image",
    title: "Oops...",
    text: `  <div class="ts-wrapper justify-content-center">
    <div class="ts-box">
      <div class="ts-btm">
        <div
          class="ts-rating d-flex align-items-center justify-content-center"
        >
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>

          <span>
            <h4>{{ post.title }}</h4>
          </span>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <p style="font-size: large">
          {{ post.description }}
        </p>
      </div>
      <h5>Author:</h5>
      <div class="ts-up">
        <div class="ts-up-left">
          <img [src]="author.avatar" alt="thumb" />
        </div>
        <div class="ts-up-right">
          <h5>{{ author.lastName }} {{ author.firstName }}</h5>
          <h6 class="mb-0">Address: {{ author.address }}</h6>
          <h6 class="mb-0">Phone: {{ author.phone }}</h6>
          <h6 class="mb-0">Email: {{ author.email }}</h6>
        </div>
      </div>
      <div
        class="but1 mt-3"
        (click)="jobValidation()"
        *ngIf="post.status != 'reserved' && show == true"
      >
        Take The Job
      </div>
    </div>
  </div>`,
    footer: '<a href="">Why do I have this issue?</a>',
  });
}
