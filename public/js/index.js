const user = document.getElementById('username');

user.addEventListener('input', e => {
    let s = user.value;

    if (s.indexOf(' ') >= 0) {
        user.setCustomValidity('No spaces allowed !!');
        user.reportValidity();
    } 
    else if (s.match(/^\d/)) {
        user.setCustomValidity('Username cannot start with a number !!');
        user.reportValidity();
    }
    else {
        user.setCustomValidity("");
    }
    // console.log(s);
});
