
$('#userLogout').on('click', () => {
    console.log('clicked');

    function onSuccess() {
        localStorage.clear();
        window.location = '/'
    }

    $.ajax({
        method: 'DELETE',
        url: '/api/logout',
        success: onSuccess,
        error: error => console.log(error),
    });

});
