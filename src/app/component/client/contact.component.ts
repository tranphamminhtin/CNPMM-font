import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="breadcrumb-area">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="breadcrumb-list">
						<h1>liên hệ</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="contact-area pad-60">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="contact-form ">
						<div class="message-title">
							<h1 class="text-center">THÔNG TIN HỔ TRỢ</h1>
							<br>
						</div>
						<div class="row">
							<form action="#" id="LienHe-form">
								<div class="form-group">
									<div class=" form-group col-md-12">
										<input name="name" id="name" type="text"
											placeholder="Tên của bạn" class="form-control" />
									</div>
									<div class="form-group col-md-12">
										<input name="email" id="email" type="text"
											placeholder="Địa chỉ email" class="form-control" />
									</div>
									<div class="form-group col-md-12">
										<input name="subject" id="subject" type="text"
											placeholder="Vấn đề" class="form-control" />
									</div>
								</div>
								<div class="form-group col-md-12">
									<div class="contact-textarea ">
										<textarea name="comment" id="comment" cols="30" rows="10"
											placeholder="Nội dung" class="form-control"></textarea>
										<input class="col-md-4 col-md-offset-4" type="submit"
											value="Gửi" onsubmit="ThongBao();" />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  `
})
export class ContactComponent {
}