var submitForm = function() {
	var input = document.getElementById("userName").value;
	var compUrl = "https://api.github.com/users/" + input + "/repos";

	if (input.length) {
		document.getElementById("repoRepository").innerHTML = "";
		var request = new XMLHttpRequest();
		request.open("GET", compUrl, true);

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status >= 200 && request.status < 400) {
				var returnObj = JSON.parse(request.responseText),
						content = "No Repos Found ):",
						newElem = document.createElement('div');

				if (returnObj.length) {
					content = "<ul>";
					for (var i in returnObj) {
						var currRepo = returnObj[i];
						content += "<li><a class='l-d_block e-slide' href='"+currRepo.html_url+"' target='_blank'>"+currRepo.name+"</a></li>";
					}
					content += "</ul>";
				}

				newElem.innerHTML = content;

				document.getElementById("repoRepository").appendChild(newElem);
			} else if (request.readyState == 4) {
				alert("ERROR! Statuscode: ", request.status);
				document.getElementById("repoRepository").innerHTML = "";
			}
		};

		request.onerror = function(error) {
			alert(error);
			console.log("ERROR! ", error);
		};

		request.send();
	} else {
		alert("like, type something ok?");
	}

	return false;
};

document.getElementById("searchSubmit").onclick = submitForm;
