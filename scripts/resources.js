const VIDEO = 1, PDF = 2, LINK = 3;
const ACTIVE = 1, INACTIVE = 0;

const MOBILE = isMobile();

const media_viewer = document.getElementById('media_viewer');
const video_viewer = document.getElementById('video_viewer')
const light_box = document.getElementById('light-box');
const video_src = document.getElementById('video_src')

window.onload = () => {
	//get file details
	fetch('//morganiverson.github.io/ticketofficewebpage/data/resources.json')
		.then(response => response.json())
		.then(jsonResponse => {
			resources = jsonResponse;
		})
		.then(
			() => {
				window.resources = resources
				getAll(window.resources)

				//CHECK URL FOR COMMANDS
				openFromURL = urlGET();
				if (openFromURL) {
					$("[name=" + openFromURL + "]").click()
				}
			}
		)
}


// outputs a javascript object from the parsed json


function showFLEX(elm) {
	elm.style.display = 'flex';
}
function showBLOCK(elm) {
	elm.style.display = 'block';
}
function hide(elm) {
	elm.style.display = 'none'
}

function openviewer(elm) {
	var view = getSRC(elm);
	console.log(view.src)

	if(view.type == LINK) {
		open("http:" + view.src, '_blank').focus();
		console.log("Link Opened!");
	}
	else {
		if (view.src != null && view.src != '') {
			document.body.style.overflow = "hidden";


			if (MOBILE) {
				media_viewer.style.width = (view.type == VIDEO) ? '90%' : '90%';
				media_viewer.style.height = (view.type == VIDEO) ? '30%' : '60%';
			}
			else {
				// console.log(media_viewer)
				media_viewer.style.width = (view.type == VIDEO) ? '70%' : '60%';
				media_viewer.style.height = (view.type == VIDEO) ? '70%' : '90%';
				light_box.style.top = window.scrollY;
			}
			media_viewer.src = view.src
			showBLOCK(media_viewer)

			showFLEX(light_box)
		}
		else {
			console.log("Error! No source found.")
		}
	}
	
}

function closeviewer() {
	document.body.style.overflow = "visible";
	// urlCLEAR()
	light_box.style.display = 'none';
	media_viewer.src = '';
}
function showerror() {
	//display flex
	//set timeout -> dfisplay none
}

function getSRC(elm) {
	name = elm.getAttribute('name')
	category = elm.getAttribute('category')
	r = window.resources.find((item) => item.category == category).srcs.find((item) => item.name == name);
	return { name: name, src: r.src, type: r.type }
}
function urlGET() {
	console.log('getting URL param: open=?')
	var url_string = window.location;
	var url = new URL(url_string);
	return url.searchParams.get("open");
}

function urlCLEAR() {
	console.log("Clear URL Param")
	var url_string = window.location;
	var url = new URL(url_string);
	url.searchParams.delete("open");
	window.location = url.href
}
function isMobile() {
	return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
}


// LOAD FROM JSON

function getAll(list){
	body = document.getElementById("page_body")
	html = ""
	list.forEach(resource_obj => {

		if(resource_obj.active) {
			html+= resourceHeader(resource_obj.title);
			html+= "<ul>"
			resource_obj.srcs.forEach(src => {
				if ("active" in src) {
					if (src.active) {
						html+= resourceLink(src, resource_obj.category)
					}
				}
				else html+= resourceLink(src, resource_obj.category)
			})
			html+= "</ul>"
		}
	})
	body.innerHTML+=html
}
function resourceHeader(title){
	return "<div class='resource_header'>" + title.toUpperCase() + "</div>"
}
function resourceLink(resource, category){
	return "<li class='resource_link' category='" + category + "' name='" + resource.name + "' onclick='openviewer(this)'>" + resource.title + "</li>" + 
	"<hr class='resource_separator'></hr>"
}