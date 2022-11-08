function findString(text) {
  document.querySelector("#output").textContent = "String found? " + window.find(text);
}

function myAlert(role) {
  var textRole = binaryToText(role);
  Swal.fire({
    title: textRole,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Copy',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      navigator.clipboard.writeText(textRole);
      Swal.fire('copyed!', '', 'success')
    }
  })
}

function binaryToText(input) {
  let output = "";
  output = input
    .split(" ")
    .map((number) => parseInt(number, 2))
    .map((number) => String.fromCharCode(number))
    .join("");
  console.log(input);
  return output;
}
