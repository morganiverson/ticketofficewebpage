<?php
// https://packagist.org/packages/phpmailer/phpmailer

		$send_email_to = json_decode(file_get_contents("../data/TicketOfficeEmail.json"))->email;
		$emailJSON = json_decode($_POST["email"]);
		
		// PHP mail()
		// $headers = "From: " . $send_email_to . "\r\n";
		// echo mail($send_email_to, $emailJSON->emailData->subjectLine , $emailJSON->emailData->messageBody, $headers);

		// PHPmailer()
		use PHPMailer\PHPMailer\PHPMailer;
		use PHPMailer\PHPMailer\Exception;

		require_once "vendor/autoload.php";

		//PHPMailer Object
		$mail = new PHPMailer(true); //Argument true in constructor enables exceptions
		
		//From email address and name
		$mail->From = $send_email_to;
		$mail->FromName = "EMU Ticket Office Contact Us Form";

		//To address and name
		$mail->addAddress($send_email_to);

		//Address to which recipient will reply
		$mail->addReplyTo($emailJSON->messageDetails->email, "Reply");

		$mail->Subject = $emailJSON->emailData->subjectLine;
		$mail->Body =  nl2br($emailJSON->emailData->messageBody);
		$mail->AltBody = $emailJSON->emailData->messageBody;
		$mail->IsHTML(true);

		// try {
		// 	$mail->send();
		// 	echo 1;
		// } catch (Exception $e) {
		// 	echo 0;
		// }
		echo 1;
?>