import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type emailOptions = {
  subject: string;
  name: string;
  email: string;
  activationToken: string;
  template: string;
};
@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  async sendEmail(options: emailOptions): Promise<any> {
    const { subject, name, email, activationToken, template } = options;
    await this.mailerService.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject,
      template,
      context: { name, activationToken },
    });
  }
}
