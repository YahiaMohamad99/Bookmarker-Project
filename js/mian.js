var sname = document.getElementById("sName");
var surl = document.getElementById("sUrl");
var warning = document.getElementById("warning-text");

var sites;
if (localStorage.getItem("sites") == null) {
  sites = [];
} else {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaysites(sites);
}

function addsite() {
  if (nameValidation()) {
    var site = {
      name: sname.value,
      url: surl.value,
    };
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites));
    clear();
    displaysites(sites);
    // validation();
  } else {
    warning.classList.remove("d-none");
  }
}

function displaysites(siteslist) {
  var holder = ``;
  for (var i = 0; i < siteslist.length; i++) {
    holder += ` <tr>
  <td>${i + 1}</td>
  <td>${siteslist[i].name}</td>
  <td class="">
<button class="btn btn-visit "onclick="visiturl(${i})">
    <i class="fa-solid fa-eye me-2"></i>Visit
</button>
  </td>
  <td>
    <button class="btn btn-danger " onclick="deletesite(${i})">
    <i class="fa-solid fa-trash me-2"></i>Delete
    </button>
  </td>
  </tr>`;
  }
  document.getElementById("data").innerHTML = holder;
}

function deletesite(i) {
  sites.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(sites));

  console.log(sites);
  displaysites(sites);
}

function visiturl(i) {
  window.open(sites[i].url);

}

function clear() {
  sname.value = "";
  surl.value = "";
}

function nameValidation() {
  var nameregex = /^[a-zA-Z0-9 ]{3,}$/;
  var urlregex =
    /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
  if (nameregex.test(sname.value) && urlregex.test(surl.value)) {
    return true;
  } else {
    return false;
  }
}

function closewarning() {
  warning.classList.add("d-none");
}
