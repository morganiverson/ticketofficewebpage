
// INPUT VALIDATION

const input_error_pairs = [
	{
		input_name: "email",
		error_id: "email-error"
	},
	{
		input_name: "sender",
		error_id: "sender-error"
	}, {
		input_name: "reason",
		error_id: "reason-error"
	},
	{
		input_name: "message",
		error_id: "message-error"
	}
];

window.onload = () => {


	/** LOAD CONTACT REASONS FROM JSON FILE */
	// fetch('//morganiverson.github.io/ticketofficewebpage/data/ContactReasons.json')
	// // fetch('/data/ContactReasons.json')
	// 	.then(response => response.json())
	// 	.then(jsonResponse => {
	// 		reasons = jsonResponse;
	// 	})
	// 	.then(
	// 		() => {
	// 			reasons.sort()
	// 			console.log(reasons);
	// 			selector = document.getElementById("reason");

	// 			reasons.forEach(item => {
	// 				selector.innerHTML+= selectOption(item)
	// 			})
	// 			selector.innerHTML+= selectOption("Other")
	// 		}
	// 	)


	resetForm();
	
	input_error_pairs.forEach(pair => {
		document.getElementById(pair.input_name).addEventListener('keyup', () => {
			document.getElementById(pair.error_id).style.display = 'none';
			document.getElementById("server-send-error").style.display = "none"
		})
		document.getElementById(pair.input_name).addEventListener('change', () => {
			document.getElementById(pair.error_id).style.display = 'none';
			document.getElementById("server-send-error").style.display = "none";

		})

	})
}

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

function selectOption(option) {
	return "<option value='" + option + "'>" + option + "</option>";
}

//TEST IF ALL FIELDS COMPLETED CORRECTLY
function allFormFieldsCompletedCorrectly() {
	var completedCorrectly = true;
	form = document.getElementById('contact_form')

	form.childNodes.forEach(node => {
		var tag = node.tagName;
		var type = node.type
		var name = node.name

		if (
			((tag == 'INPUT' && type != 'submit') ||
				tag == 'TEXTAREA' ||
				tag == 'SELECT')
			&& node.value == ''
		) {
			pair = input_error_pairs.find(item => item.input_name == node.name)
			document.getElementById(pair.error_id).style.display = 'block';
			completedCorrectly = false
		}
		else if (tag == 'INPUT' && name == 'email') {
			if (!validateEmail(node.value)) {
				pair = input_error_pairs.find(item => item.input_name == node.name)
				console.log(node.name + " " + pair.error_id)
				document.getElementById(pair.error_id).style.display = 'block';
				completedCorrectly = false
			}
		}
	});
	return completedCorrectly;
}

function fitContent(elm) {
	elm.style.height = 'auto';
	elm.style.height = (elm.scrollHeight + 5) + 'px';
}

//SEND FORM DATA VIA EMAIL USING PHP REQ
function send() {
	form = document.getElementById('contact_form')

	if (allFormFieldsCompletedCorrectly()) {

		emailJSON = {
			messageDetails: {
				sentAt: new Date().toLocaleString()
			}
		}

		form.childNodes.forEach(node => {
			// console.log(item.tagName)
			var tag = node.tagName;
			var type = node.type

			if (
				((tag == 'INPUT' && type != 'submit') ||
					tag == 'TEXTAREA' ||
					tag == 'SELECT')
			) {
				emailJSON['messageDetails'][node.name] = node.value
			}
		})

		emailJSON.messageDetails.message = emailJSON.messageDetails.message.replaceAll('\n', '\n\t')

		emailJSON.emailData = {
			subjectLine: 'Ticket Office Contact Us Form [From=' + emailJSON.messageDetails.sender + ' (' + emailJSON.messageDetails.email + '), Reason=' + emailJSON.messageDetails.reason + ', SentAt=' + emailJSON.messageDetails.sentAt + ']',

			messageBody: 'This is a message from the EMU Ticket Office Contact Us Form.\n\n' +
				'\nSender: \"' + emailJSON.messageDetails.sender + '\"' +
				'\n\nEmail: ' + emailJSON.messageDetails.email +
				'\n\nReason For Contact: \"' + emailJSON.messageDetails.reason + '\"' +
				'\n\nSent At: \"' + emailJSON.messageDetails.sentAt + '\"' +
				'\n\n\nMessage: \n\t\"\n\t' + emailJSON.messageDetails.message + '\n\t\"'
		}

		console.log(emailJSON)
		//SEND EMAIL
		$.post({
			url: "scripts/email.php",
			data:
			{
				email: JSON.stringify(emailJSON)
			},
			success: (res) => {
				console.log("Email Status: " + res)
				// alert(res)
				if (res == 1) {
					showSendSuccess()
					document.getElementById("form-entry").reset()
					console.log("Success: Message Sent!")
				}
				else {
					document.getElementById("server-send-error").style.display = "flex";
					// form.style.display = "block";
					console.log("Error: Message not sent")
				}
			}
		})
	}
}


//SHOW/HIDE ALERTS 
function showSendSuccess() {
	hideSendError();
	modal = document.getElementById("server-send-success");
	document.body.style.overflow = "hidden";
	
	modal.style.top = window.scrollY;
	modal.style.display = 'flex';
}
function showSendError() {
	document.getElementById("server-send-error").style.display = "flex";
}

function hideSendSuccess() {
	document.body.style.overflow = "auto";
	document.getElementById("server-send-success").style.display = 'none';
	resetForm()
}
function hideSendError() {
	document.body.style.overflow = "auto";

	document.getElementById("server-send-error").style.display = "none";
}

function resetForm() {
	inputs = [...document.getElementsByTagName("INPUT"), document.getElementById("message"), document.getElementById("reason")];
	inputs.forEach((elm) => {
		if (elm.type != "submit") {
			elm.value = ""
		}
	});
}

function demo(response) {
	if (allFormFieldsCompletedCorrectly()) {
		switch (response) {
			case "success": showSendSuccess(); break;
			case "error": showSendError(); break;
		}
	}
}